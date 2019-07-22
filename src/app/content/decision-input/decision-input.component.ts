import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { Decision } from '../entities.model';
import { ServerService } from '../services/server.service';

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
    private renderer: Renderer2) {}

  @ViewChild('decisionTextInput', {static: true}) decisionTextInput: ElementRef;

  onSubmit(form: NgForm): void {
    if (this.dataService.decision) {
      this.dataService.decision.text = form.value.decisionText;
    } else {
      this.dataService.decision = new Decision(this.serverService.getNewDecisionId(), form.value.decisionText, [], []);
    }
    this.router.navigate(['/options-n-factors']);
  }

  ngOnInit(): void {
    if (this.dataService.decision) {
      this.renderer.setValue(this.decisionTextInput.nativeElement, this.dataService.decision.text);
    }
  }

}
