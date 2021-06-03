import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {CountryService} from '../../../domain/country/country.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.scss']
})
export class CountryAddComponent implements OnInit, OnDestroy {

  private componentIsDestroyed$ = new Subject<boolean>();

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

  constructor(private formBuilder: FormBuilder,
              private countryService: CountryService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.countryService.addCountry(this.formGroup.value)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(
        () => this.router.navigate(['/countries'])
      );

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

  ngOnDestroy(): void {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  onCancel(): void {
    this.router.navigate(['/countries']);
  }
}
