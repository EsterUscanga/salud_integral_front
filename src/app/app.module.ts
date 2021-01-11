import '@angular/compiler'

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
import { SaludPreventivaComponent } from './salud-preventiva/salud-preventiva.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AtencionNutricionalComponent,
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    JustificacionFaltasComponent,
    CalendarioComponent,
    SaludPreventivaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NoopAnimationsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
