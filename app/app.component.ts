import { Component } from '@angular/core';
import { Vote } from './classes/vote';
import { Criterion } from './classes/criterion';

const VOTES: Vote[] = [
  { title: 'Restaurant for the evening', criteria: [], options: []}
]

@Component({
    selector: 'my-app',
    template: `
      <h1>Konsensus</h1>
      <ul>
        <li *ngFor="let vote of votes" (click)="onSelect(vote)">
          <span>{{vote.title}}</span>
        </li>
      </ul>
      <vote-detail [vote]="selectedVote"></vote-detail>
    `
})

export class AppComponent {
  votes = VOTES;
  selectedVote: Vote;

  onSelect(vote: Vote): void {
    this.selectedVote = vote;
  }
}
