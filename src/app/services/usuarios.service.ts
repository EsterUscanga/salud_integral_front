import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl = environment.baseUrl

  constructor (private httpClient: HttpClient) { }

  public getUsuariosPorMatricula(matricula: String){
    return this.httpClient.get(`${this.baseUrl}/usuario/${matricula}`)
  }
}
