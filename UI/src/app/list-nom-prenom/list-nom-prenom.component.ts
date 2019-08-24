import { Component, OnInit } from '@angular/core';
import { CollegeService } from '../service/college.service';
import { Collegien } from '../models/collegien';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'collegien-list-nom-prenom',
  templateUrl: './list-nom-prenom.component.html',
  styleUrls: ['./list-nom-prenom.component.css']
})
export class ListNomPrenomComponent implements OnInit {

  
  public collegien: Collegien = {};
  public dataSource: Collegien[] = [];

  constructor(private collegeService: CollegeService) { }

  ngOnInit() {

    this.displayCollumns();
  }

  displayCollumns() {
    this.collegeService.
    getAllCollegienCritere(this.collegien, ['nomEleve', 'prenomEleve']).subscribe(res => this.dataSource = res)
  }

  previousIDcollegien(event) {
    console.log('previous', event)
  }

  btnAddCollegien() {
    document.getElementById('addCollegien').classList.add('btn-color');
  } 

}
