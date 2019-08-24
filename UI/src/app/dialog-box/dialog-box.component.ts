import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})

// ** c'est le nom appelé dans la boite de dialogue
// ** mettre aussi dans app.module.ts dans entryComponents ! */
export class DialogBoxComponent implements OnInit {

  constructor( public mydialogRef: MatDialogRef<DialogBoxComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    console.log('DialogBox :', this.data);
  }

  btnokclick() {
    console.log('Ok :', this.data);
    this.mydialogRef.close();
  }

}
