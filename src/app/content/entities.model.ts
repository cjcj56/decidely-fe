export class Option {
    constructor(public id: number, public text: string, public priority: number, public decision: Decision) {}
}


export class Factor {
    constructor(public id: number, public text: string, public weight: number, public decision: Decision) {}
}


export class SimpleDecison {
    constructor(
        public id: number,
        public text: string,
        public options: Option[],
        public factors: Factor[],
        public scores: {[key: string]: Score}) {}
}


export class Decision {
    constructor(
        public id: number,
        public text: string,
        public options: Option[],
        public factors: Factor[],
        public scores: ScoreCollection) {}

    toSimpleDecision(): SimpleDecison {
        return new SimpleDecison(this.id, this.text, this.options, this.factors, this.scores.getScores());
    }
}


export class Score {
    constructor(public id: number, public option: Option, public factor: Factor, public score: number) {}
}


export class ScoreCollection {
    private scores: {[key: string]: Score} = {};

    private getKey(option: Option, factor: Factor): string {
        return option.id + ':' + factor.id;
    }

    addScore(score: Score): void {
        this.scores[this.getKey(score.option, score.factor)] = score;
    }

    getScore(option: Option, factor: Factor): Score {
        return this.scores[this.getKey(option, factor)];
    }

    getScores(): {[key: string]: Score} {
        return {...this.scores};
    }

    setScores(scores: {[key: string]: Score}): void {
        this.scores = scores;
    }

    getScoresAsArray(): Score[] {
        return Object.values(this.scores);
    }

    clear(): void {
        this.scores = {};
    }

    get length(): number {
        return Object.keys(this.scores).length;
    }
}
