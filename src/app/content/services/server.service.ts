import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Decision, Option, Factor, ScoreCollection, Score } from '../entities.model';


@Injectable({providedIn: 'root'})
export class ServerService {

    serverAddr = 'localhost';
    serverPort = '8080';
    serverProtocol = 'http';
    server: string;
    urls: {[s: string]: string};

    decisionPh = '{decisionId}';

    constructor(private http: HttpClient) {
        this.server = this.serverProtocol + '://' + this.serverAddr + ':' + this.serverPort;

        this.urls = {
            addDecision: '/decisions',
            updateDecisionById: '/decisions/' + this.decisionPh,
            getDecisionById: '/decisions/' + this.decisionPh,
            addOptions: ['/decisions', this.decisionPh, 'options'].join('/'),
            updateOptions: ['/decisions', this.decisionPh, 'options'].join('/'),
            addFactors: ['/decisions', this.decisionPh, 'factors'].join('/'),
            updateFactors: ['/decisions', this.decisionPh, 'factors'].join('/'),
            addScoresToDecisionId: ['/decisions', this.decisionPh, 'scores'].join('/'),
            updateScores: '/scores',
            deleteDecisionsScores: ['/decisions', this.decisionPh, 'scores'].join('/'),
            getResults: ['/decisions', this.decisionPh, 'results'].join('/')
        };
    }

    createNewDecision(decision: Decision): Observable<object> {
        return this.http.post(
            this.server + this.urls.addDecision,
            decision.toSimpleDecision()
        );
    }

    updateDecision(decision: Decision): void {
        this.http.put(
            this.server + this.urls.updateDecisionById.replace(this.decisionPh, '' + decision.id),
            decision.toSimpleDecision()
        ).subscribe();
    }

    getDecision(decisionId: number): Observable<object> {
        return this.http.get(this.server + this.urls.getDecisionById.replace(this.decisionPh, '' + decisionId));
    }

    addOptions(options: Option[], decisionId: number): Observable<object> {
        return this.http.post(
            this.server + this.urls.addOptions.replace(this.decisionPh, '' + decisionId),
            {entities: options});
    }

    updateOptions(options: Option[], decisionId: number): void {
        this.http.put(
            this.server + this.urls.updateOptions.replace(this.decisionPh, '' + decisionId),
            {entities: options}).subscribe();
    }

    addFactors(factors: Factor[], decisionId: number): Observable<object> {
        return this.http.post(
            this.server + this.urls.addFactors.replace(this.decisionPh, '' + decisionId),
            {entities: factors});
    }

    updateFactors(factors: Factor[], decisionId: number): void {
        this.http.put(
            this.server + this.urls.updateFactors.replace(this.decisionPh, '' + decisionId),
            {entities: factors}).subscribe();
    }

    addScoresToDecisionId(scores: Score[], decisionId: number): Observable<object> {
        return this.http.post(
            this.server + this.urls.addScoresToDecisionId.replace(this.decisionPh, '' + decisionId),
            {entities: scores});
    }

    updateScores(scores: Score[]): void {
        this.http.put(this.server + this.urls.updateScores, {entities: scores}).subscribe();
    }

    deleteDecisionsScores(decisionId: number): void {
        this.http.delete(
            this.server + this.urls.deleteDecisionsScores.replace(this.decisionPh, '' + decisionId)
            ).subscribe();
    }

    getResults(decisionId: number): Observable<object> {
        return this.http.get(this.server + this.urls.getResults.replace(this.decisionPh, '' + decisionId));
    }
}
