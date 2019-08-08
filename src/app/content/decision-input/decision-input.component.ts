import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { Decision, ScoreCollection } from '../entities.model';
import { ServerService } from '../services/server.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-decision-input',
  templateUrl: './decision-input.component.html',
  styleUrls: ['./decision-input.component.css']
})
export class DecisionInputComponent implements OnInit {

  constructor(
    private serverService: ServerService,
    private dataService: DataService,
    private router: Router,
    private fb: FormBuilder) {}

  decisionForm: FormGroup;

  ngOnInit(): void {
    this.decisionForm = this.fb.group({
      decisionText: this.fb.control(this.dataService.decision ? this.dataService.decision.text : null, Validators.required)
    });
  }

  onSubmit(): void {
    if (this.dataService.decision && this.dataService.decision.id) {
      this.dataService.decision.text = this.decisionForm.get('decisionText').value;
      this.serverService.updateDecision(this.dataService.decision);
    } else {
      this.dataService.decision =
      new Decision(null, this.decisionForm.get('decisionText').value, [], [], new ScoreCollection());
      this.serverService.createNewDecision(this.dataService.decision).subscribe(response => {
        this.dataService.decision.id = response as unknown as number;
      });
    }

    this.router.navigate(['/options-n-factors']);
  }
}
