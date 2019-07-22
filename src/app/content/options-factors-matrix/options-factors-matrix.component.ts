import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-options-factors-matrix',
  templateUrl: './options-factors-matrix.component.html',
  styleUrls: ['./options-factors-matrix.component.css']
})
export class OptionsFactorsMatrixComponent implements OnInit {

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  scoreForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.scoreForm = this.fb.group({scores: this.fb.array([])});
    const baseArray = this.scoreForm.get('scores') as FormArray;
    for (let i = 0; i < this.dataService.factors.length; ++i) {
      baseArray.push(this.fb.array([]));
      for (let j = 0; j < this.dataService.options.length; ++j) {
        (baseArray.at(i) as FormArray).push(this.fb.control(null, [Validators.required, Validators.min(0), Validators.max(10)]));
      }
    }

    if (this.dataService.scores) {
      for (let i = 0; i < this.dataService.factors.length; ++i) {
        for (let j = 0; j < this.dataService.options.length; ++j) {
           ((this.scoreForm.get('scores') as FormArray).at(i) as FormArray).at(j).setValue(this.dataService.scores[i][j]);
        }
      }
    }
  }

  onSubmit() {
    console.log(this.scoreForm);
  }

}
