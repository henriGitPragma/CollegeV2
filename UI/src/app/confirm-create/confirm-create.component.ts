import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit, } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-confirm-create',
  templateUrl: './confirm-create.component.html',
  styleUrls: ['./confirm-create.component.css']
})
export class ConfirmCreateComponent implements OnInit {

//----------------------------------------------------------------------------
//-----------------------Variables--------------------------------------------
//----------------------------------------------------------------------------

  nbLocalStorage: number;
  admin: any;

//--------------------------------------------------------------------------------
//-----------------------Constructeur + Injection de dépendances------------------
//--------------------------------------------------------------------------------

  constructor(
    public dialogRef: MatDialogRef<ConfirmCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private router: Router) { }

  //------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //------------------------------------------------------------------------------

  ngOnInit() {
     console.log('dans la popup ConfirmCreateComponent');
     
    //Verification si connextion et admin
    this.admin = sessionStorage.getItem("admin");
    this.nbLocalStorage = sessionStorage.length;
    console.log(this.nbLocalStorage);
    if (this.nbLocalStorage == 0) {
      this.router.navigate(['/auth'])
    }
    if (this.admin == "false") {
      this.router.navigate(['/accueilUser'])
    }
  }

  //------------------------------------------------------------------------------
  //----------------------Close la pop up-----------------------------------------
  //------------------------------------------------------------------------------

  //Fermer la pop up
  return(){
    this.dialogRef.close();
  }
}
