import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { Score, Option } from '../entities.model';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-options-factors-matrix',
  templateUrl: './options-factors-matrix.component.html',
  styleUrls: ['./options-factors-matrix.component.css']
})
export class OptionsFactorsMatrixComponent implements OnInit {

  constructor(
    private data: DataService,
    private fb: FormBuilder,
    private router: Router,
    private server: ServerService) { }

  scoreForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.scoreForm = this.fb.group({scores: this.fb.array([])});
    const baseArray = this.scoreForm.get('scores') as FormArray;
    for (let i = 0; i < this.data.factors.length * this.data.options.length; ++i) {
      baseArray.push(this.fb.control(null, [Validators.required, Validators.min(0), Validators.max(10)]));
    }

    const scores = this.data.scores;
    if (scores.length > 0) {
      for (const score of scores.getScoresAsArray()) {
        const factorIdx = this.data.factors.findIndex(factor => factor.id === score.factor.id);
        const optionIdx = this.data.options.findIndex(option => option.id === score.option.id);
        baseArray.at(this.data.options.length * factorIdx + optionIdx).setValue(score.score);
      }
    }
  }

  onSubmit() {
    const baseArray = this.scoreForm.get('scores') as FormArray;
    if (this.data.scores.length > 0) {
      // If scores were already subbmitted, delete old scores and submit anew,
      // since options and factors may change and their order may also change.
      this.server.deleteDecisionsScores(this.data.decision.id);
    }

    for (let i = 0; i < this.data.factors.length; ++i) {
      for (let j = 0; j < this.data.options.length; ++j) {
        const scoreValue = baseArray.at(this.data.options.length * i + j).value;
        this.data.scores.addScore(new Score(null, this.data.options[j], this.data.factors[i], scoreValue));
      }
    }

    const scoresArray = this.data.scores.getScoresAsArray();
    this.server.addScoresToDecisionId(scoresArray, this.data.decision.id).subscribe(response => {
      const scoresIds = response as number[];
      for (let i = 0; i < scoresArray.length; ++i) {
        scoresArray[i].id = scoresIds[i];
      }
    });
    this.server.getResults(this.data.decision.id).subscribe(response => {
      this.data.options = response as Option[];
    });
    this.router.navigate(['/recommendations']);
  }

}
