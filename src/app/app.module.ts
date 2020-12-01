import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtencionNutricionalComponent } from './atencion-nutricional/atencion-nutricional.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { JustificacionFaltasComponent } from './justificacion-faltas/justificacion-faltas.component';
import { CalendarioComponent } from './calendario/calendario.component';


@NgModule({
  declarations: [
    AtencionNutricionalComponent,
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    JustificacionFaltasComponent,
    CalendarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
