import { Injectable } from '@angular/core';
import { Decision } from '../entities.model';

@Injectable({providedIn: 'root'})
export class ServerService {
    getDecision(decisionId: number): Decision {
        return null;
    }

    getNewDecisionId(): number {
        return Math.floor(Math.random() * (10 ** 8));
    }

}
