import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-global-confirm',
  templateUrl: './global-confirm.component.html',
  styleUrls: ['./global-confirm.component.scss']
})
export class GlobalConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {confirmation: string}) { }

  ngOnInit(): void {
  }

}
