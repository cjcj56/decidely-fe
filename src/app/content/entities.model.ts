export class Option {
    constructor(public id: number, public text: string) {}
}

export class Factor {
    constructor(public id: number, public text: string, public weight: number) {}
}

export class Decision {
    constructor(public id: number, public text: string, public options: Option[], public factors: Factor[]) {}
}
