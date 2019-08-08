import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { SimpleDecison, Decision, ScoreCollection } from '../entities.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private server: ServerService, private router: Router, private data: DataService) {}

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.server.getDecision(form.value.decisionId).subscribe(response => {
      const simpleDecision = (response as SimpleDecison);
      this.data.decision = new Decision(simpleDecision.id,
                                        simpleDecision.text,
                                        simpleDecision.options,
                                        simpleDecision.factors,
                                        new ScoreCollection());
      this.data.decision.scores.setScores(simpleDecision.scores);
      // this.data.decision.scores.decision = this.data.decision;
      this.data.options = simpleDecision.options;
      this.data.factors = simpleDecision.factors;
      this.data.scores = this.data.decision.scores;
      this.router.navigate(['/decision']);
    });
  }

  onNewDecision() {
    this.data.cleanData();
    this.router.navigate(['/decision']);
  }

}
