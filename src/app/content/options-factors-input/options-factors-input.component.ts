import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

import { DataService } from '../services/data.service';
import { Option, Factor } from '../entities.model';

@Component({
  selector: 'app-options-factors-input',
  templateUrl: './options-factors-input.component.html',
  styleUrls: ['./options-factors-input.component.css']
})
export class OptionsFactorsInputComponent implements OnInit {

  constructor(private dataService: DataService, private fb: FormBuilder, private router: Router) { }

  form: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  onAddOption(): void {
    (this.form.get('options') as FormArray).push(this.fb.control('', Validators.required));
  }

  onAddFactor(): void {
    (this.form.get('factors') as FormArray).push(this.fb.group({
      text: ['', Validators.required],
      weight: ['', [Validators.required, Validators.pattern('^(?:[1-9]|10)$')]]
    }));
  }

  private initForm(): void {
    this.form = this.fb.group({
      options: this.fb.array([], this.minArrayLengthValidator(2)),
      factors: this.fb.array([], this.minArrayLengthValidator(1))
    });

    if (this.dataService.options) {
      this.dataService.options.forEach(option => {
        (this.form.get('options') as FormArray).push(this.fb.control(option.text, Validators.required));
      });
    }
    if (this.dataService.factors) {
      this.dataService.factors.forEach(factor => {
        (this.form.get('factors') as FormArray).push(this.fb.group({
          text: this.fb.control(factor.text, Validators.required),
          weight: this.fb.control(factor.weight, [Validators.required, Validators.pattern('^(?:[1-9]|10)$')])
        }));
      });
    }
  }

  getElements(arrayName: string) {
    return (this.form.get(arrayName) as FormArray).controls;
  }

  onDeleteElement(arrayName: string, index: number): void {
    (this.form.get(arrayName) as FormArray).removeAt(index);
  }

  onSubmit(): void {
    this.dataService.options = [];
    (this.form.get('options') as FormArray).controls.forEach((option, i) => {
      this.dataService.options.push(new Option(i, option.value));
    });

    this.dataService.factors = [];
    (this.form.get('factors') as FormArray).controls.forEach((factor, i) => {
      this.dataService.factors.push(new Factor(i, factor.value.text, factor.value.weight));
    });

    this.router.navigate(['/matrix']);
  }

  private minArrayLengthValidator(n: number) {
    return (array: FormArray): {[s: string]: boolean} => {
      if (array.length < n) {
        return {'NotEnoughElementsInArray': true};
      }
      return null;
    };
  }

}
