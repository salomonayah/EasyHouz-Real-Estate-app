import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../auth-services/authentication.service';
import { User } from '../model/auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  @Output() userCreated = new EventEmitter<boolean>();

  @ViewChild('signUpForm', {static: true}) signUpForm!: NgForm;

  @ViewChild('gidimoInput', { static: false }) phonenumberInput!: ElementRef<HTMLInputElement>;

  phoneVerificationCDN = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js';

  caption!: string;
  error = false;
  poneNumberIsValid = false;
  value!: string;
  countryCode = 'fr';


  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(formData: NgForm): void {
    const signUpFormData = formData.form.value;

    const userData: User = {
      fullname: signUpFormData.fullname,
      phonenumber: signUpFormData.phonenumber,
      email: signUpFormData.email,
      password: signUpFormData.password
    };

    this.authenticationService.signUp(userData).subscribe(
      (resp) => {
        this.userCreated.emit(true);
        console.log('signUp', resp);
    });

  }

  isSet(value: any): boolean {
    if ((typeof value === 'string') && value.trim() === '') {
      return false;
    }
    return typeof value !== 'undefined' && value !== null && value;
  }

  formDataChecking(dataType: any, value: any): { status: boolean, message: string } {

    if (value) {
      if (dataType === 'letter-only') {
        return {
          status: /^[a-zA-Z ]+$/.test(value),
          message: '* This field can only support letter, not number and symbol.',
        };
      }
      else if (this.isSet(value) && dataType === 'letter-and-symbol') {
          return {
            status: !/\d+/.test(value),
            message: '* This field can support all characters except numbers.',
          };
      }
      else if (this.isSet(value) && dataType === 'string-of-number') {
          return {
            status: /^\d+$/.test(value),
            message: '* This field can only support numbers.',
          };
      }
      else if (dataType === 'email') {
        return {
          // tslint:disable-next-line: max-line-length
          status: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            String(value).toLowerCase()
          ),
          message:
            '* Please enter a valid e-mail address.',
        };
      }

    }

    return {
      status: false,
      message: ''
    };

  }

  canSubmitFormData(): boolean {
    // tslint:disable-next-line:prefer-const
    let formData = this.signUpForm.form.value;
    // Trim all the string value of the form before sending
    Object.keys(formData).forEach(
      (k) => {
        if (typeof formData[k] === 'string')  {
          formData[k] = formData[k].trim();
        }
      }
    );

    // if anyone of the form value is an empty string we are not submitting the form
    return  Object.values(formData).indexOf('') > -1 ? false : true;
  }

  hasError(event: any): void {
    console.log(event);
    if (event === false) {
      this.caption = 'Please Enter a valid phone number.';
      this.error = true;
      this.poneNumberIsValid = false;

    } else {
      this.caption = '';
      this.error = false;
      this.poneNumberIsValid = true;
    }
  }

  getNumber(event: any): void {
    this.value = event;
  }

  telInputObject(obj: any): void { // this event is called on init of
    obj.setCountry(this.countryCode);
  }
}
