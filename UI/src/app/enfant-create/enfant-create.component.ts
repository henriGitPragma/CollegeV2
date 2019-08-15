import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CollegeService } from '../service/college.service';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-enfant-create',
  templateUrl: './enfant-create.component.html',
  styleUrls: ['./enfant-create.component.css'],
})
export class EnfantCreateComponent implements OnInit {

 // ** Create form Eole
 CollegeForm: FormGroup = this.createEoleFormGroup();

 // ** color of slide
 slidecolor = 'warn';
 btncolor = 'warn';

 constructor(  private collegeService: CollegeService,
               private dialog: MatDialog,
               private router: Router,
             ) { }

 ngOnInit() { }


 // ** function to create form Eole
 createEoleFormGroup() {
   return new FormGroup({
    nomEleve: new FormControl(''),
    prenomEleve: new FormControl(''),
    classeEleve: new FormControl(''),
    mailEleve: new FormControl(''),
    regimeEleve: new FormControl(''),
    nomParent: new FormControl(''),
    prenomParent: new FormControl(''),
    qualiteParent: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    passwordConfirme: new FormControl(''),
    enable: new FormControl(''),
    
   });
 }

 NewCollegienSave() {
   const newCollegien = this.CollegeForm.value;
   console.log('New Collegien', newCollegien);
   this.collegeService.addCollegien(newCollegien).subscribe(data => this.handlerSucess(data));
 }

 handlerSucess(collegien) {
   console.log('Collegien ajouté : ', collegien._id);

   // ** DialogBox Message de confirmation
   // ** appelle le composant DialogBoxComponent et lui passe comme data : l'éolien
   console.log('Dialogbox', collegien);

   this.dialog.open(DialogBoxComponent, {
     width: '460px', maxWidth: '98%',
     // On lui passe les données : un titre et le message qui peut être en html
     data: {title: 'Information', msg: 'Le nouvel éolien <b>' + collegien.nom + '</b> a bien été enregistré.'}
   });

   // ** go to allmétéole
   // avec ça le routage file sur la page sans attendre la fermeture de la boite de dialogue
   this.router.navigate(['/global']);
   // avec ça on attend la fermeture mais il ne faut pas importer Router, enfin je crois
   // location.href = '/Collegien/admin/allmeteole';
 }

}
