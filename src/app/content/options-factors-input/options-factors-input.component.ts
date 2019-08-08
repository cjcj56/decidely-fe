import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

import { DataService } from '../services/data.service';
import { Option, Factor } from '../entities.model';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-options-factors-input',
  templateUrl: './options-factors-input.component.html',
  styleUrls: ['./options-factors-input.component.css']
})
export class OptionsFactorsInputComponent implements OnInit {

  constructor(
    private data: DataService,
    private fb: FormBuilder,
    private router: Router,
    private server: ServerService) {}

  form: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  onAddOption(): void {
    (this.form.get('options') as FormArray).push(this.fb.control(null, Validators.required));
  }

  onAddFactor(): void {
    (this.form.get('factors') as FormArray).push(this.fb.group({
      text: [null, Validators.required],
      weight: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
    }));
  }

  private initForm(): void {
    this.form = this.fb.group({
      options: this.fb.array([], this.minArrayLengthValidator(2)),
      factors: this.fb.array([], this.minArrayLengthValidator(1))
    });

    if (this.data.options && this.data.options.length > 0) {
      this.data.options.forEach(option => {
        (this.form.get('options') as FormArray).push(this.fb.control(option.text, Validators.required));
      });
    }
    if (this.data.factors && this.data.factors.length > 0) {
      this.data.factors.forEach(factor => {
        (this.form.get('factors') as FormArray).push(this.fb.group({
          text: this.fb.control(factor.text, Validators.required),
          weight: this.fb.control(factor.weight, [Validators.required, Validators.min(1), Validators.max(10)])
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
    const decision = this.data.decision;
    const options = this.data.options;
    const factors = this.data.factors;

    if (options.length === 0) {
      (this.form.get('options') as FormArray).controls.forEach(optionCtrl => {
        options.push(new Option(null, optionCtrl.value, -1, decision));
      });
      this.server.addOptions(options, decision.id).subscribe(response => {
        const optionsIds = response as number[];
        for (let i = 0; i < options.length; ++i) {
          options[i].id = optionsIds[i];
        }
      });
    } else {
      (this.form.get('options') as FormArray).controls.forEach((optionCtrl, i) => {
        options[i].text = optionCtrl.value;
        options[i].priority = -1;
      });
      this.server.updateOptions(options, decision.id);
    }

    if (factors.length === 0) {
      (this.form.get('factors') as FormArray).controls.forEach(factorCtrl => {
        factors.push(new Factor(null, factorCtrl.value.text, factorCtrl.value.weight, decision));
      });
      this.server.addFactors(factors, decision.id).subscribe(response => {
        const factorsIds = response as number[];
        for (let i = 0; i < factors.length; ++i) {
          factors[i].id = factorsIds[i];
        }
      });
    } else {
      (this.form.get('factors') as FormArray).controls.forEach((factorCtrl, i) => {
        factors[i].text = factorCtrl.value.text;
        factors[i].weight = factorCtrl.value.weight;
      });
      this.server.updateFactors(factors, decision.id);
    }
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
