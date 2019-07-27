import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { ScoreCollection, Score } from '../entities.model';

@Component({
  selector: 'app-options-factors-matrix',
  templateUrl: './options-factors-matrix.component.html',
  styleUrls: ['./options-factors-matrix.component.css']
})
export class OptionsFactorsMatrixComponent implements OnInit {

  constructor(private data: DataService, private fb: FormBuilder, private router: Router) { }

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

    if (this.data.scores && this.data.scores.length > 0) {
      for (const score of this.data.scores.getAllScores()) {
        const factorIdx = this.data.factors.findIndex(factor => factor.id === score.factor.id);
        const optionIdx = this.data.options.findIndex(option => option.id === score.option.id);
        baseArray.at(this.data.options.length * factorIdx + optionIdx).setValue(score.score);
      }
    }
  }

  onSubmit() {
    this.data.scores = new ScoreCollection();
    const baseArray = this.scoreForm.get('scores') as FormArray;
    for (let i = 0; i < this.data.factors.length; ++i) {
      for (let j = 0; j < this.data.options.length; ++j) {
        const scoreValue = baseArray.at(this.data.options.length * i + j).value;
        this.data.scores.addScore(new Score(this.data.options[j], this.data.factors[i], scoreValue));
      }
    }

    this.router.navigate(['/recommendations']);
  }

}
