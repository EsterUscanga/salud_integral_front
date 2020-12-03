import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JustificacionFaltasService {
  baseUrl = environment.baseUrl

  constructor (private httpClient: HttpClient) { }

  public postJustificacionFaltas(matricula: String, cuatrimestre: number, clasificacionEnfermedad: number, descripcionEnfermedad: String){
    return this.httpClient.post(
      `${this.baseUrl}/justificacionFaltasFormulario`, 
      {
        matricula,
        cuatrimestre,
        clasificacionEnfermedad,
        descripcionEnfermedad
      })
  
  }
}
