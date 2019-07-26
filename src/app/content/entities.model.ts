export class Option {
    constructor(public id: number, public text: string, public priority: number) {}
}


export class Factor {
    constructor(public id: number, public text: string, public weight: number) {}
}


export class Decision {
    constructor(
        public id: number,
        public text: string,
        public options: Option[],
        public factors: Factor[],
        public scores: ScoreCollection) {}
}


export class Score {
    constructor(public option: Option, public factor: Factor, public score: number) {}
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

    getAllScores(): Score[] {
        return Object.values(this.scores);
    }

    clear(): void {
        this.scores = {};
    }

    get length(): number {
        return Object.keys(this.scores).length;
    }
}
