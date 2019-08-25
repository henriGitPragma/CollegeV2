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

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------


  //-----------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances---------------
  //-----------------------------------------------------------------------------

  constructor(
    public mydialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }


  //------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //------------------------------------------------------------------------------

  ngOnInit() {
    console.log('DialogBox :', this.data);
  }


  //------------------------------------------------------------------------
  //-----------------------Methodes-----------------------------------------
  //------------------------------------------------------------------------
  /**
   * Appelé pour la fermeture de la dialog box
   */
  btnokclick() {
    console.log('Ok :', this.data);
    this.mydialogRef.close();
  }
}
