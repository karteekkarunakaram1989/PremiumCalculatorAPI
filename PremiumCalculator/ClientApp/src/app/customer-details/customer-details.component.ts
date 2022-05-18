import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerDetails } from '../models/customer-details';
import { FormValidationService } from '../services/form-validation.service';
import { PremiumServiceService } from '../services/premium-service.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customerForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  calculatedPremium: number;
  customerDetails: CustomerDetails;
  canShowResult = false;
  occupations = [
    { value: 'Light Manual', text: 'Cleaner' },
    { value: 'Professional', text: 'Doctor' },
    { value: 'White Collar', text: 'Author' },
    { value: 'Heavy Manual', text: 'Farmer' },
    { value: 'Heavy Manual', text: 'Mechanic' },
    { value: 'Light Manual', text: 'Florist' }
  ];
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
      'max': 'Maximum insured amount can be $100,000 AUD',
      'invalidDecimal': 'Please enter the amount in numbers or decimals in 2digits(ex: $1234.56)'
    }
  }

  formErrors = {
    'name': '',
    'age': '',
    'dateOfBirth': '',
    'occupation': '',
    'sumInsured': ''
  };

  constructor(private fb: FormBuilder, private _premiumService: PremiumServiceService, private _formsValidationService: FormValidationService) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      age: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      occupation: ['', Validators.required],
      sumInsured: ['', [Validators.required, Validators.min(1000), Validators.max(100000), this._formsValidationService.allowNumbersAndDecimals()]]
    });
    this.customerForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.customerForm);
    });
    this.customerForm.controls.dateOfBirth.valueChanges.subscribe((dateOfBirth) => {
      this.customerForm.controls.age.setValue(this.calculateAge(dateOfBirth));
    })
    this.minDate = new Date(1900, 0, 1);
    this.maxDate = new Date();
  }

  calculateAge(dateOfBirth) {
    var ageDifMs = Date.now() - dateOfBirth;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getCalculatedPremium(): void {
    if (!this.customerForm.valid)
      return;
    else {
      this.mapFormValuesToCustomerDetailsModel();
      this._premiumService.getCalculatedPremium(this.customerDetails).subscribe(result => {
        this.calculatedPremium = result
        this.canShowResult = this.calculatedPremium > 0
      },
        (err: any) => {
          this.canShowResult = false;
          console.log(err)
        }
      );
    }
  }

  mapFormValuesToCustomerDetailsModel() {
    this.customerDetails = new CustomerDetails();
    this.customerDetails.age = this.customerForm.value.age;
    this.customerDetails.occupationRating = this.customerForm.value.occupation;
    this.customerDetails.sumInsured = this.customerForm.value.sumInsured;
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

  onFocusOutEvent(event: any) {
    this.customerForm.controls.dateOfBirth.markAsTouched();
    this.logValidationErrors();
  }

}
