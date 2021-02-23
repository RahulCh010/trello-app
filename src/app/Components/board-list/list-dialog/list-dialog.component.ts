import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ListDialog } from './../../../Models/list-dialog.model';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.css']
})
export class ListDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ListDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ListDialog) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
