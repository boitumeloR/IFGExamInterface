import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  holdEmail = '';
  fileName = ''
  isLinear = false;
  firstFormGroup = this.fb.group({
    EmailAddress: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    Password: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    ConfirmPassword: ['', Validators.compose([Validators.required, Validators.maxLength(50)])]
  });
  secondFormGroup = this.fb.group({
    Name: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    Surname: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    IDNumber: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    CentreID: [null, Validators.required],
    LearnerSchool: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    LearnerGradeID: [null, Validators.required],
    Address1: ['', Validators.compose([Validators.required, Validators.maxLength(40)])],
    Address2: ['', Validators.compose([Validators.required, Validators.maxLength(40)])],
    Code: ['', Validators.compose([Validators.required, Validators.maxLength(4)])]
  });

  centres$: Observable<any[]> = this.authService.getCentres(this.global.getServer());
  grades$: Observable<any[]> = this.authService.getCentres(this.global.getServer());
  constructor(private fb: FormBuilder, private authService: AuthService,
              private global: GlobalService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  registerAuth(stepper: MatStepper): void {

    const authObj = {
      EmailAddress: this.firstFormGroup.get('EmailAddress')?.value,
      Password: this.firstFormGroup.get('Password')?.value
    };
    this.authService.registerAuth(this.global.getServer(), authObj).subscribe(res => {
      if (res.Success) {
        this.holdEmail = res.EmailAddress;
        stepper.next();
      } else {
        this.snack.open(res.Error, 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 3000
        });
      }
    }, (error: HttpErrorResponse) => {
      this.snack.open('An error occured on our servers, please try again', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 3000
      });
    });
  }

  onFileSelected(event: { target: { files: { name: string; }[]; }; }): void {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // this.srcResult = e.target.result;
        this.fileName = event.target.files[0].name;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  goToLink() {
    const url = 'https://drive.google.com/file/d/1kZx3uLbfGoA-wdPWA3KBtWG0tXR2tYLu/view?usp=sharing';
    window.open(url, 'blank');
  }

}
