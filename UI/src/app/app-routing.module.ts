import { CreateCompteComponent } from './create-compte/create-compte.component';
import { AuthComponent } from './auth/auth.component';
import { ConfirmCreateComponent } from './confirm-create/confirm-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { EnfantCreateComponent } from './enfant-create/enfant-create.component';
import { ListGlobalComponent } from './list-global/list-global.component';
import { AccueilUserComponent } from './accueil-user/accueil-user.component';
import { UpdateFileCSVComponent } from './update-file-csv/update-file-csv.component';




//--------------------------------//!\\ Attention à l'ordre des routes-------------------
const routes: Routes = [
{path:'', component:AuthComponent},
{path:'accueilUser', component:AccueilUserComponent},
{path:'updateCSV', component: UpdateFileCSVComponent},
{path:'auth', component:AuthComponent},
{path:'createCompte/:id', component: CreateCompteComponent},
{path:'auth/:id', component: ListGlobalComponent},
{path:'global', component: ListGlobalComponent},
{path: 'enfantCreate', component: EnfantCreateComponent},
{path:'confirmCreate', component: ConfirmCreateComponent},
{path: '**', component: ErrorpageComponent} // Aucune route associée

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
