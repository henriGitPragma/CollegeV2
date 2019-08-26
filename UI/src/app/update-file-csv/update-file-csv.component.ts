import { CollegeService } from './../service/college.service'
import { Router } from '@angular/router';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';



@Component({
  selector: 'app-update-file-csv',
  templateUrl: './update-file-csv.component.html',
  styleUrls: ['./update-file-csv.component.css']
})
export class UpdateFileCSVComponent implements OnInit {

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------

  @ViewChild('file', { static: true }) file: ElementRef;
  @Input() btnText: string;
  @Input() errorMsg: string;
  @Output() response: EventEmitter<any> = new EventEmitter<any>();

  sucessCSV;
  tabCSV;


  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(
    private collegeService: CollegeService,
    private router: Router) {
    this.btnText = 'Importer un fichier CSV pour creer des enfants';
    this.errorMsg = 'Invalid format. Please upload only csv files..';
  }

  //------------------------------------------------------------------------------
  //-----------------------Initialisation-----------------------------------------
  //------------------------------------------------------------------------------

  ngOnInit() { }


  //-------------------------------------------------------------------
  //-----------------------Methodes------------------------------------
  //-------------------------------------------------------------------
  /**
   * Import CSV
   * @param e 
   */
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

    this.router.navigate(['/']);
  }

  /**
   * Import CSV
   * @param file 
   */
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

  /**
   *  Import CSV
   */
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

  /**
   *  Import CSV
   * @param data 
   * @param headers 
   */
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
      this.collegeService.addCollegien(this.tabCSV).subscribe(data => this.sucessCSV = data)
      obj.push(o);
    });
    this.file.nativeElement.value = '';
    this.response.emit({ type: 'success', data: obj });
  }
}

