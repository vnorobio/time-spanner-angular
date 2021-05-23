import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.scss']
})
export class CountryAddComponent implements OnInit {

  formGroup = this.formBuilder.group(
    {
      alpha3Code: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      name: [null, Validators.required],
      numericCode: [
        null,
        Validators.compose([Validators.required, Validators.minLength(2)])
      ]
    }
  );

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    alert('Thanks!');
  }

  get alpha3Code(): AbstractControl {
    return this.formGroup.controls.alpha3Code;
  }

  get name(): AbstractControl {
    return this.formGroup.controls.name;
  }

  get numericCode(): AbstractControl {
    return this.formGroup.controls.numericCode;
  }

  getControl(name: string): AbstractControl {
    return this.formGroup.controls[name];
  }
}
