import { EnfantCreateComponent } from './enfant-create/enfant-create.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CSV2JSONModule } from 'angular2-csv2json';


import { ErrorpageComponent } from './errorpage/errorpage.component';
import { ToShortDatePipe } from './pipes/to-short-date.pipe';
import { UpdateFileCSVComponent } from './update-file-csv/update-file-csv.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TreeCalendarComponent } from './tree-calendar/tree-calendar.component';
import { HoraireComponent } from './horaire/horaire.component';
import { PresenceComponent } from './presence/presence.component';
import { MatTableComponent } from './mat-table/mat-table.component';
import { ListNomPrenomComponent } from './list-nom-prenom/list-nom-prenom.component';

import { KpiComponent } from './kpi/kpi.component';


import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { AuthenticationService } from './service/authentication.service';
import { AuthGuardService } from './service/auth-guard.service';
import { HomePageComponent } from './home-page/home-page.component';


import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { InfoCollegienComponent } from './info-collegien/info-collegien.component';
import { AccueilUserComponent } from './accueil-user/accueil-user.component';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1050534674845-0b9kjqk7prbps3m2gdh91ei6vv4t8dan.apps.googleusercontent.com')
  },
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    ErrorpageComponent,
    ToShortDatePipe,
    DialogBoxComponent,
    UpdateFileCSVComponent,
    MainNavComponent,
    DashboardComponent,
    TreeCalendarComponent,
    HoraireComponent,
    PresenceComponent,
    MatTableComponent,
    ListNomPrenomComponent,
    LoginComponent,
    ProfileComponent,
    HomePageComponent,
    KpiComponent,
    EnfantCreateComponent,
    InfoCollegienComponent,
    AccueilUserComponent,
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
    SocialLoginModule,

  ],
  providers: [

    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },

    AuthenticationService,
    AuthGuardService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
