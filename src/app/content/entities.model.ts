export interface Option {
    id: number;
    text: string;
}

export interface Factor {
    id: number;
    text: string;
    weight: number;
    score: number;
}

export interface Decision {
    id: number;
    text: string;
    options: Option[];
    factors: Factor[];
}
