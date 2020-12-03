import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadesService {

  baseUrl = environment.baseUrl

  constructor (private httpClient: HttpClient) { }

  public getClasificacionEnfermedades(){
    return this.httpClient.get(`${this.baseUrl}/clasificacionesEnfermedades`)
  }

  public getEnfermedadesPatologicas(){
    return this.httpClient.get(`${this.baseUrl}/antecendentesPatologicos`)
  }
}
