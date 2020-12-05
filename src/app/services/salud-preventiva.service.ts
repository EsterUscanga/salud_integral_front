import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaludPreventivaService {

  baseUrl = environment.baseUrl

  constructor (private httpClient: HttpClient) { }

  public getGruposSanguineos(){
    return this.httpClient.get(`${this.baseUrl}/gruposSanguineos`)
  }

  public getAntecedentesFamiliares(){
    return this.httpClient.get(`${this.baseUrl}/antecedentesFamiliares`)
  }

  public getMetodosAnticonceptivos(){
    return this.httpClient.get(`${this.baseUrl}/metodosAnticonceptivos`)
  }

}
