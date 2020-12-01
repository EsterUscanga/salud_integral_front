import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtencionNutricionalComponent } from './atencion-nutricional/atencion-nutricional.component';
import { HomeComponent } from './home/home.component';
import { JustificacionFaltasComponent } from './justificacion-faltas/justificacion-faltas.component';

const routes: Routes = [
  { path: 'atencion-nutricional', component: AtencionNutricionalComponent },
  { path: 'justificacion-faltas', component: JustificacionFaltasComponent },
  { path: '', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
