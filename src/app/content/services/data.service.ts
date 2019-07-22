import { Decision, Option, Factor } from '../entities.model';


export class DataService {
    decision: Decision;
    options: Option[];
    factors: Factor[];
    scores: number[][];

    cleanData(): void {
        this.decision = this.options = this.factors = this.scores = null;
    }

    fillTestData() {
        this.decision = new Decision(123123123, 'Test Decision', this.options, this.factors);

        this.options = [];
        this.factors = [];
        for (let i = 1; i <= 3; ++i) {
            this.options.push(new Option(i - 1, 'test option #' + i));
            this.factors.push(new Factor(i - 1, 'test factor #' + i, i * 2));
        }
        this.factors.push(new Factor(3, 'test factor #4', 8));

        this.scores = [];
        for (let i = 0; i < this.factors.length; ++i) {
            this.scores.push([]);
            for (let j = 0; j < this.options.length; ++j) {
                this.scores[i].push(Math.floor(Math.random() * 10) * this.factors[i].weight);
            }
        }

        console.log(this.decision);
        console.log(this.options);
        console.log(this.factors);
        console.log(this.scores);
    }
}
