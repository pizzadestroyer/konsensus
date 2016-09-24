import { Score } from './score';

export class Criterion {
  weight: number;
  description:string;
  importances: number[];
  scores: Score[];

  constructor(description:string, importances:number[]) {
    this.description = description;
    this.importances = importances;
    this.scores = new Array<Score>();
  }
}
