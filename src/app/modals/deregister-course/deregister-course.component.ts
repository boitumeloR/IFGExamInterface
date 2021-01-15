import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-deregister-course',
  templateUrl: './deregister-course.component.html',
  styleUrls: ['./deregister-course.component.scss']
})
export class DeregisterCourseComponent implements OnInit {

  reasonGroup: FormGroup = this.fb.group({
    reason: ['', Validators.compose([Validators.required, Validators.maxLength(100)])]
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
