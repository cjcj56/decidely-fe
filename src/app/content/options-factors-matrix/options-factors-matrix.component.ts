import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-options-factors-matrix',
  templateUrl: './options-factors-matrix.component.html',
  styleUrls: ['./options-factors-matrix.component.css']
})
export class OptionsFactorsMatrixComponent implements OnInit {

  constructor(private dataService: DataService, private fb: FormBuilder, private router: Router) { }

  scoreForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.scoreForm = this.fb.group({scores: this.fb.array([])});
    const baseArray = this.scoreForm.get('scores') as FormArray;
    for (let i = 0; i < this.dataService.factors.length; ++i) {
      for (let j = 0; j < this.dataService.options.length; ++j) {
        baseArray.push(this.fb.control(null, [Validators.required, Validators.min(0), Validators.max(10)]));
      }
    }

    if (this.dataService.scores) {
      for (let i = 0; i < this.dataService.factors.length; ++i) {
        for (let j = 0; j < this.dataService.options.length; ++j) {
          baseArray.at(this.dataService.options.length * i + j).setValue(this.dataService.scores[i][j]);
        }
      }
    }
  }

  onSubmit() {
    this.dataService.scores = [];
    const baseArray = this.scoreForm.get('scores') as FormArray;
    for (let i = 0; i < this.dataService.factors.length; ++i) {
      for (let j = 0; j < this.dataService.options.length; ++j) {
        this.dataService.scores[i][j] = baseArray.at(this.dataService.options.length * i + j).value;
      }
    }
    
    this.router.navigate(['/recommendations']);
  }

}
