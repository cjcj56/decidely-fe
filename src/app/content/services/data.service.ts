import { Decision, Option, Factor, Score, ScoreCollection } from '../entities.model';


export class DataService {
    decision: Decision;
    options: Option[];
    factors: Factor[];
    scores: ScoreCollection;

    cleanData(): void {
        this.decision = this.options = this.factors = this.scores = null;
    }

    fillTestData() {
        this.options = [];
        this.factors = [];
        for (let i = 1; i <= 3; ++i) {
            this.options.push(new Option(i - 1, 'test option #' + i, -1));
            this.factors.push(new Factor(i - 1, 'test factor #' + i, i * 2));
        }
        this.factors.push(new Factor(3, 'test factor #4', 8));

        this.scores = new ScoreCollection();
        for (const factor of this.factors) {
            for (const option of this.options) {
                this.scores.addScore(new Score(option, factor, Math.floor(Math.random() * 10 * factor.weight)));
            }
        }

        this.decision = new Decision(123123123, 'Test Decision', this.options, this.factors, this.scores);

        console.log(this.decision);
        console.log(this.options);
        console.log(this.factors);
        console.log(this.scores);
    }
}
