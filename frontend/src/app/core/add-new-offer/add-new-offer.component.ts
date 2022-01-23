import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-add-new-offer',
  templateUrl: './add-new-offer.component.html',
  styleUrls: ['./add-new-offer.component.scss']
})
export class AddNewOfferComponent implements OnInit {

  @ViewChild('newPostForm', {static: true}) newPostForm!: NgForm;


  imgToCropSelected = false;
  imageChangedEvent: any = '';
  croppingValidated = false;
  croppedImage: any = '';
  imgToCrop = false;
  housePicture = null;
  uploadingError: any;


  constructor() { }

  ngOnInit(): void {

  }

  onSubmit(formData: NgForm): void {
    console.log(formData.form.value);
    console.log('2');
    console.log(this.newPostForm.form.value);
  }

  validCropping(): void {
    this.croppingValidated = true;
  }

  rejectCropping(): void {
    this.croppingValidated = false;
    this.imgToCropSelected = false;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
    this.imgToCrop = true;
    const blobData = event.file;
    if (blobData) {
      this.beforeImageUpload(this.blobToFile(blobData, 'houseImage'));
    }
  }

  beforeImageUpload(file: any): boolean {
    const validImage = this.controlImage(file);
    if (validImage) {
      this.housePicture = file;
      return true;
    } else {
      return false;
    }
  }

  controlImage = (file: File) => {
    const isJPGPNG =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg';
    if (!isJPGPNG) {
      this.uploadingError =
        'Sorry, you can only upload image with those format : JPEG|JPG|PNG';
    }
    const isLt1M = file.size / 1024 / 1024 <= 1;
    if (!isLt1M) {
      this.uploadingError = 'Please only upload image less than 1Mo. Thanks';
    }
    return isJPGPNG && isLt1M;
  }

  blobToFile(theBlob: Blob, fileName: string): File {
    const b: any = theBlob;
    // A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    return theBlob as File;
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imgToCropSelected = true;
  }

  isSet(value: any): boolean {
    if ((typeof value === 'string') && value.trim() === '') {
      return false;
    }
    return typeof value !== 'undefined' && value !== null && value;
  }

  formDataChecking(dataType: any, value: any): { status: boolean, message: string } {

    if (this.isSet(value)) {
      if (dataType === 'text-only') {
        return {
          status: !/\d+/.test(value),
          message: '* This field can only support letter and space.',
        };
      }  else if (dataType === 'unsigned-int') {
        return {
          status: /^([1-9]\d*|0)$/.test(value),
          message:
            '* This field can only support integer without any other symbol.',
        };
      }
    }

    return {
        status: false,
        message: '* Please enter a valid answer'
    };

  }

  canSubmitFormData(): boolean {
    // tslint:disable-next-line:prefer-const
    let formData = this.newPostForm.form.value;
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


