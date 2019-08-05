
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
import { ConfirmCreateComponent } from './confirm-create/confirm-create.component';
import { ListGlobalComponent } from './list-global/list-global.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { AccueilUserComponent } from './accueil-user/accueil-user.component';
import { UpdateFileCSVComponent } from './update-file-csv/update-file-csv.component';
import { CSV2JSONModule } from 'angular2-csv2json';
import { AdvanceAdminComponent } from './advance-admin/advance-admin.component';
import { CreateCompteComponent } from './create-compte/create-compte.component';
import { AdvanceAdmin2Component } from './advance-admin2/advance-admin2.component';




@NgModule({
  declarations: [
    AppComponent,
    ErrorpageComponent,
    EnfantCreateComponent,
    ToShortDatePipe,
    ConfirmCreateComponent,
    ListGlobalComponent,
    AuthComponent,
    HeaderComponent,
    AccueilUserComponent,
    UpdateFileCSVComponent,
    AdvanceAdminComponent,
    CreateCompteComponent,
    AdvanceAdmin2Component,
  ],
  entryComponents: [
     ConfirmCreateComponent,
     AdvanceAdmin2Component,
     AdvanceAdminComponent], //Pour la pop up de confirmation
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
