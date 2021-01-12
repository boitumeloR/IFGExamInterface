import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  isLinear = false;
  firstFormGroup = this.fb.group({
    EmailAddress: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    Password: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    ConfirmPassword: ['', Validators.compose([Validators.required, Validators.maxLength(50)])]
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required]
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
