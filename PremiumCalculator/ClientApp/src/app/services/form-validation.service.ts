import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() {}

  allowNumbersAndDecimals(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      else {
        if(control.value<1000 && control.value>100000)
          return null;
      }
      const regex = new RegExp(/^\d+(\.\d{1,2})?$/g);
      const valid = String(control.value).match(regex);
      return valid ? null : { invalidDecimal: true };
    };
  }
}
