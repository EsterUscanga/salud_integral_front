import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtencionNutricionalService {

  baseUrl = environment.baseUrl

  constructor (private httpClient: HttpClient) { }

  public postAtencionNutricional(matricula: String, talla: number, peso: number, imc:number){
    return this.httpClient.post(
      `${this.baseUrl}/atencionNutricionalFormulario`,
      {
        matricula, 
        talla, 
        peso, 
        imc
      })
  }
}
