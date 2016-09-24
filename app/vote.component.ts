import { Component, Input } from '@angular/core';
import { Vote } from './classes/vote';

@Component({
  selector: 'vote-detail',
  template: `
    <div *ngIf="vote">
      <h2>{{vote.title}}</h2>
      <criteria-component [criteria]=vote.criteria [options]=vote.options ></criteria-component>
  `
})

export class VoteComponent {
  @Input()
  vote: Vote;
}
