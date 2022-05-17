import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customerForm: FormGroup;
  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be greater than 2 characters.',
      'maxlength': 'Name must be less than 20 characters.'
    },
    'age': {
      'required': 'Age is required.',
      'minlength': 'Age must be greater than 2 characters.',
      'maxlength': 'Age must be less than 20 characters.'
    },
    'dateOfBirth': {
      'required': 'DateOfBirth is required.'
    },
    'occupation': {
      'required': 'Occupation is required.'
    },
    'sumInsured': {
      'required': 'Insured amount is required.',
      'min': 'Minimum insured amount should be $1,000 AUD',
      'max': 'Maximum insured amount can be $100,000 AUD'
    }
  }

  formErrors = {
    'name': '',
    'age': '',
    'dateOfBirth': '',
    'occupation': '',
    'sumInsured': ''
  };

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      age: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      occupation: ['', Validators.required],
      sumInsured: ['', [Validators.required, Validators.min(1000), Validators.max(100000)]]
    });
    this.customerForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.customerForm);
    });
  }

  logValidationErrors(group: FormGroup = this.customerForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

}
