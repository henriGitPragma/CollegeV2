import { AccueilUserComponent } from './accueil-user/accueil-user.component';
import { PresenceComponent } from './presence/presence.component';
import { InfoCollegienComponent } from './info-collegien/info-collegien.component';
import { EnfantCreateComponent } from './enfant-create/enfant-create.component';
import { HoraireComponent } from './horaire/horaire.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { UpdateFileCSVComponent } from './update-file-csv/update-file-csv.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuardService } from './service/auth-guard.service';




//--------------------------------//!\\ Attention à l'ordre des routes-------------------
const routes: Routes = [

  // Routes d'autehntification
  { path: '', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  

  // Home page
  { path: 'accueilUser', component: AccueilUserComponent, canActivate: [AuthGuardService] },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'infoCollegien', component: InfoCollegienComponent, canActivate: [AuthGuardService] },
  { path: 'presence', component: PresenceComponent, canActivate: [AuthGuardService] },
  { path: 'addCollegien', component: EnfantCreateComponent, canActivate: [AuthGuardService] },
  { path: 'horaire', component: HoraireComponent, canActivate: [AuthGuardService] },
  { path: 'updateCSV', component: UpdateFileCSVComponent, canActivate: [AuthGuardService] },
  { path: '**', component: ErrorpageComponent, canActivate: [AuthGuardService] } // Aucune route associée

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
