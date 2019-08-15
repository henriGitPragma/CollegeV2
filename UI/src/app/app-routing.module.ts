import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { UpdateFileCSVComponent } from './update-file-csv/update-file-csv.component';




//--------------------------------//!\\ Attention à l'ordre des routes-------------------
const routes: Routes = [
/* {path:'updateCSV', component: UpdateFileCSVComponent},
{path: '**', component: ErrorpageComponent} */ // Aucune route associée

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
