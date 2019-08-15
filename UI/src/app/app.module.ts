import { DialogBoxComponent } from './dialog-box/dialog-box.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { EnfantCreateComponent } from './enfant-create/enfant-create.component';
import { ToShortDatePipe } from './pipes/to-short-date.pipe';
import { UpdateFileCSVComponent } from './update-file-csv/update-file-csv.component';
import { CSV2JSONModule } from 'angular2-csv2json';





@NgModule({
  declarations: [
    AppComponent,
    ErrorpageComponent,
    EnfantCreateComponent,
    ToShortDatePipe,
    DialogBoxComponent
  ],
  entryComponents: [
     DialogBoxComponent,
     ], //Pour la pop up de confirmation
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //Penser a ajouter a chaque import
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CSV2JSONModule,

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
