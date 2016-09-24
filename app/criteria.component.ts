import { Component, Input } from '@angular/core';
import { Criterion } from './classes/criterion';
import { Score } from './classes/score';

@Component({
  selector: 'criteria-component',
  template: `
    <h2 *ngIf="winningOptionModel">Current winning choice is {{winningOptionModel}}</h2>
    <table>
      <tr>
        <th colspan=3></th>
        <th *ngFor="let option of options" colspan="2">{{option}}</th>
      </tr>
      <tr>
        <th>Criterion</th>
        <th>Importance</th>
        <th>Weight</th>
        <ng-container *ngFor="let option of options">
        <th>Score</th>
        <th>Weight</th>
        </ng-container>
      </tr>
      <tr *ngFor="let criterion of criteria">
        <td>
          <span>{{criterion.description}}</span>
        </td>
        <td>
          <span *ngFor="let importance of criterion.importances">{{importance}}</span>
        </td>
        <td>
          <span>{{criterion.weight}}</span>
        </td>
        <ng-container *ngFor="let score of criterion.scores">
        <td>
          <input [(ngModel)]="score.score" (change)="scoringChanged()" placeholder="Score me!"/>
        </td>
        <td>
          <span>{{score.weight}}</span>
        </td>
        </ng-container>
      </tr>
      <tr>
        <td colspan=3></td>
        <ng-container *ngFor="let totalScore of totalScoresModel">
          <td></td>
          <td>{{totalScore}}</td>
        </ng-container>
      </tr>
    </table>

    <form (ngSubmit)="newCriterion()">
      <div>
        <label for="criterion">Criterion</label>
        <input type="text" id="criterion" required [(ngModel)]="criterionModel.description" name="criterion">
      </div>
      <div>
        <label for="importance">Importance</label>
        <input type="text" id="importance" required [(ngModel)]="criterionImportanceModel" name="importance">
      </div>
      <button type="submit">Save criterion</button>
    </form>

    <form (ngSubmit)="newOption()">
      <div>
        <label for="option">Option</label>
        <input type="text" id="option" required [(ngModel)]="optionModel" name="option">
      </div>
      <button type="submit">Save option</button>
    </form>
  `
})

export class CriteriaComponent {
  @Input()
  criteria: Criterion[];

  @Input()
  options: string[];

  criterionModel = new Criterion("", new Array<number>());
  criterionImportanceModel: number;
  optionModel: string;
  totalScoresModel = new Array<number>();
  winningOptionModel: string;

  newCriterion() {
    this.saveCriterion();
    this.addScores();
    this.saveWeight();
    this.resetCriterionImportanceModelValues();
  }

  saveCriterion(): void {
    this.criterionModel.importances.push(this.criterionImportanceModel);
    this.criteria.push(this.criterionModel);
  }

  saveWeight(): void {
    var totalImportances: number = 0;

    for(let criterion of this.criteria) {
      // with more importances given, calculate the average. until then, lets use just the first index.
      totalImportances = parseInt(String(totalImportances)) + parseInt(String(criterion.importances[0]));
    }

    for(let criterion of this.criteria) {
      criterion.weight = criterion.importances[0] / totalImportances;
    }
  }

  resetCriterionImportanceModelValues(): void {
    this.criterionModel = new Criterion("", new Array<number>());
    this.criterionImportanceModel = null;
  }

  newOption() {
    this.options.push(this.optionModel);
    this.optionModel = null;
    this.addScores();
  }

  addScores(): void {
    for(let criterion of this.criteria) {
      while (criterion.scores.length < this.options.length) {
        criterion.scores.push(new Score());
      }
    }
  }

  scoringChanged(): void {
    for(let criterion of this.criteria) {
      if(criterion.weight) {
        for(let score of criterion.scores) {
          if (score.score) {
              score.weight = score.score * criterion.weight;
          }
        }
      }
    }
    this.scoringTotalsChanged();
  }

  scoringTotalsChanged(): void {
    var highestScoreIndex: number;
    var highestScore: number = 0;

    for(var i = 0; i < this.options.length; i++) {
      var optionIndex:number = i;
      var totalScoreOfOption: number = 0;
      for(var j = 0; j < this.criteria.length; j++) {
        if (this.criteria[j] && this.criteria[j].scores[i]) {
          totalScoreOfOption = totalScoreOfOption + this.criteria[j].scores[i].weight;
        }
      }

      if (totalScoreOfOption) {
        var totalScore:number = totalScoreOfOption*100;
        this.totalScoresModel[i] = totalScore;

        if (totalScore > highestScore) {
          highestScore = totalScore;
          this.winningOptionModel = this.options[i];
        }
      }
    }
  }
}
