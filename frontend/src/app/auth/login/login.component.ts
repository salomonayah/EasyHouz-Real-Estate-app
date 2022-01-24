import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('signInForm', {static: true}) signInForm!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(formData: NgForm): void {
    console.log(formData.form.value);
    console.log('2');
    console.log(this.signInForm.form.value);
  }

  isSet(value: any): boolean {
    if ((typeof value === 'string') && value.trim() === '') {
      return false;
    }
    return typeof value !== 'undefined' && value !== null && value;
  }

  formDataChecking(dataType: any, value: any): { status: boolean, message: string } {

    if (this.isSet(value) && dataType === 'email') {
        return {
          status: !/\d+/.test(value),
          message: '* This field can only support letter and space.',
        };
    }

    return {
        status: false,
        message: '* Please enter a valid email'
    };

  }

  canSubmitFormData(): boolean {
    // tslint:disable-next-line:prefer-const
    let formData = this.signInForm.form.value;
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



}
