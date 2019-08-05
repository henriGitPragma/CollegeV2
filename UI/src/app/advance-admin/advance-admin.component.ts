import { Component, OnInit, Inject } from '@angular/core';
import { CollegeService } from '../service/college.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advance-admin',
  templateUrl: './advance-admin.component.html',
  styleUrls: ['./advance-admin.component.css']
})
export class AdvanceAdminComponent implements OnInit {

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------

  isSendMail: string;
  resUpdateStatus: any;
  isUpdateModif: any;
  isActived: boolean = false;


  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------ 
  //--------------------------------------------------------------------------------

  constructor(private collegeService: CollegeService,
    public dialogRef: MatDialogRef<AdvanceAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router) { }


  //------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //------------------------------------------------------------------------------

  ngOnInit() {
    console.log(' fenetre de pop up de AdvanceAdminComponent', this.data);
  };

  //----------------------------------------------------------------------
  //-------------------- Suppression d'un seul Eleve----------------------
  //----------------------------------------------------------------------

  //Suppression d'un seul eleve
  delete() {
    console.log(' dans delete openDialog delete avec ID', this.data);
    //On recupere que les _value de chaque elements dans le tableau
    //cette _value = à l'ID
    /* this.collegeService.deleteSingleEnfants(this.data.data._id)
      .subscribe(data => this.handleSucess(data), err => this.handleError(err)); */
  };

  //Succes >> this.collegeService.deleteSingleEnfants(this.data.data._id)
  handleSucess(data) {
    console.log('Donnee effacé avec success', data.msg);
    this.dialogRef.close();
    this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() =>
    this.router.navigate(["global"]));
  };

  //Error >> this.collegeService.deleteSingleEnfants(this.data.data._id)
  handleError(error) {
    console.log('Echec dans handleError', error);
    console.error(error);
  };

  //--------------------------------------------------------------
  //-------------------- Envoy de mail Unique---------------------
  //--------------------------------------------------------------

  //Envoyer un mail  a un seu eleve
  sendMail() {
    console.log(' dans sendmail openDialog SendMail avec ID', this.data.data);
    /* this.collegeService.postEnfantByIdSendMail(this.data.data._id, this.data.data.mailEleve)
      .subscribe(res => console.log(res), error => this.handleErrorSendMail(error)); */
  };

  //Succes >> this.collegeService.postEnfantByIdSendMail(this.data.data._id,this.data.data.mailEleve )
  handleSucessSendMail(res) {
    console.log('Mail envoyé', res);
    this.isSendMail = "Mail envoyé";
  };

  //Error >> this.collegeService.postEnfantByIdSendMail(this.data.data._id,this.data.data.mailEleve )
  handleErrorSendMail(error) {
    console.log('echec de l\'envoie', error);
    this.isSendMail = "Echec de l'envoi";
  };
}
