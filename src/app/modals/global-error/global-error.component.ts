import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.scss']
})
export class GlobalErrorComponent implements OnInit {

  errData: any = this.data;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {error: string},
              private dialogRef: MatDialogRef<GlobalErrorComponent>) { }

  ngOnInit(): void {
  }

  Confirm(): void {
    this.dialogRef.close();
  }

  Cancel(): void {
    this.dialogRef.close();
  }
}
