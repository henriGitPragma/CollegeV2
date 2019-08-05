import { Component, OnInit, Inject } from '@angular/core';
import { CollegeService } from '../service/college.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';


@Component({
  selector: 'app-advance-admin2',
  templateUrl: './advance-admin2.component.html',
  styleUrls: ['./advance-admin2.component.css']
})
export class AdvanceAdmin2Component implements OnInit {

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------

  @ViewChild('file', {static: true}) file: ElementRef;
  @Input() btnText: string;
  @Input() errorMsg: string;
  @Output() response: EventEmitter<any> = new EventEmitter<any>();


  idMany: string[] = [];
  mail: string[] = [];

  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(private collegeService: CollegeService,
    public dialogRef: MatDialogRef<AdvanceAdmin2Component>,
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router) {
    this.errorMsg = 'Invalid format. Please upload only csv files..';
  }

  //------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //------------------------------------------------------------------------------

  ngOnInit() {
    console.log(' fenetre de pop up de AdvanceAdmin2Component');
  };

  //---------------------------------------------------------------------
  //-------------------- Mail groupés------------------------------------
  //---------------------------------------------------------------------

  //-----------------------Variables-------------------------------------

  eMail: string = "";
  idEleve: string[] = [];
  tabMail: string[] = [];
  bExist: boolean = false;


  //Methode pour envoyer un mail groupé
  sendManyMails() {
    /* this.collegeService.getData()
      .subscribe(res => this.handleSuccessGetData(res), err => this.handleErrorGetData(err)) */
  }


  //Succes >> this.collegeService.getData()
  handleSuccessGetData(dataSource) {
    console.log(dataSource)

    for (let i = 0; i < dataSource.length; i++) {
      this.bExist = false;

      for (let k = 0; k < this.tabMail.length; k++) {
        if (dataSource[i].mailEleve == this.tabMail[k]) {
          this.bExist = true;
          break;
        }
      }

      if (this.bExist == false) {
        this.eMail = dataSource[i].mailEleve;
        this.idEleve.length = 0;
        this.idEleve.push(dataSource[i]._id);

        for (let j = i + 1; j < dataSource.length; j++) {
          if (this.eMail == dataSource[j].mailEleve)
            this.idEleve.push(dataSource[j]._id);
        };

        console.log('this.eMail', this.eMail);
        console.log('this.idEleve', this.idEleve);
        this.tabMail.push(this.eMail)

        if (this.idEleve.length > 1) {
          console.log('dataID MULTIPLE ', this.idEleve.length);
          /* this.collegeService.sendManyMails(this.idEleve, this.eMail)
            .subscribe(res => this.handleSuccessSendManyMails(res), error => this.handleErrorSendManyMails(error)); */
        } else {
          console.log('dataID UNIQUE', this.idEleve.length);
          /* this.collegeService.postEnfantByIdSendMail(this.idEleve[0], this.eMail)
            .subscribe(res => this.handleSuccessPostEnfantByIdSendMail(res), error => this.handleErrorPostEnfantByIdSendMail(error)); */
        };
      }
    }
    console.log('ECHEC')
  }

  //Error >> this.collegeService.getData()
  handleErrorGetData(err) {
    console.log('Error dans  handleErrorGetData', err);
  };




  //Succes >> this.collegeService.sendManyMails(this.idEleve, this.eMail)
  handleSuccessSendManyMails(res) {
    console.log('Mail envoyé Multiple', res);
  };

  //Error >> this.collegeService.sendManyMails(this.idEleve, this.eMail)
  handleErrorSendManyMails(error) {
    console.log('echec de l\'envoie Multiple', error);
  };




  //Succes >> this.collegeService.postEnfantByIdSendMail(this.idEleve[0], this.eMail)
  handleSuccessPostEnfantByIdSendMail(res) {
    console.log('Mail envoyé Unique', res);
  };

  //Error >> this.collegeService.postEnfantByIdSendMail(this.idEleve[0], this.eMail)
  handleErrorPostEnfantByIdSendMail(error) {
    console.log('echec de l\'envoie Unique', error);
  };


  //--------------------------------------------------------------------
  //--------------------Suppression TOTAL-------------------------------
  //--------------------------------------------------------------------

  //Suppresion de tous la base de données
  openDialogResetAllUser() {
   /*  this.collegeService.deleteAll()
      .subscribe(data => this.handleSucessUser(data), error => this.handleErrorUser(error)) */
  };

  //Succes >> this.collegeService.deleteAll()
  handleSucessUser(data) {
    console.log(`Toutes les données ont été supprimée ${data}`)
  }

  //Error >> this.collegeService.deleteAll()
  handleErrorUser(error) {
    console.log(`Echec suppression des données ${error}`)
  }


  //-----------------------------------------------------------
  //-------------------Import CSV------------------------------
  //-----------------------------------------------------------

  //--------------------------Variables------------------------

  sucessCSV;
  tabCSV;

  //Methode pour l'import CSV
  async getFiles(e) {
    console.log("Initialisation")
    try {
      const file = e.target.files[0];
      if (file.type !== 'application/vnd.ms-excel' && file.type !== 'text/csv') {
        this.file.nativeElement.value = '';
        this.response.emit({ type: 'error', data: this.errorMsg });
        console.log("Erreur ficher du type", file.type);
        return;
      }
      let formatted: any = await this.readerResultOptimized(file);
      console.log('5', formatted)
      let [headers, ...data] = this.formatCSVData(
        formatted.result.split(/\r?\n|\r/)
      );
      this.arrayToObject(data, headers);
    } catch (e) {
      this.file.nativeElement.value = '';
      this.response.emit({ type: 'success', data: [] });
    }

    /* this.router.navigate(['/global']); */
  }

  readerResultOptimized(file) {
    console.log('1', file.type);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      console.log('2')
      reader.onload = () => {
        let datas = reader.result;
        if (datas) {
          resolve({ result: datas });
          console.log('3')
        } else {
          reject('No data found');
          console.log('4 Pas de donnnée trouvée')
        }
      };
      reader.readAsBinaryString(file);
    });
  }

  formatCSVData(data) {
    console.log('6')
    return data.map(text => {
      const re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
      const re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
      if (!re_valid.test(text)) return null;
      let a = [];
      text.replace(re_value, (m0, m1, m2, m3) => {
        if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
        else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
        else if (m3 !== undefined) a.push(m3);
        return '';
      });
      if (/,\s*$/.test(text)) a.push('');
      console.log('7', a)
      return a;
    });
  }

  async arrayToObject(data, headers) {
    console.log('8')
    let obj = [];
    data.map(d => {
      let o = {};
      for (let j = 0; j < headers.length; j++) {
        o[headers[j]] = d[j];
      }
      o = JSON.parse(JSON.stringify(o, (key, value) => (!value ? '' : value)));

      console.log('----------------Insertion d\'un Utilisateur-------------', o)
      this.tabCSV = o;
/*       this.collegeService.createEnfant(this.tabCSV).subscribe(data => this.sucessCSV = data)
 */      obj.push(o);
    });
    this.file.nativeElement.value = '';
    this.response.emit({ type: 'success', data: obj });
  }
}



