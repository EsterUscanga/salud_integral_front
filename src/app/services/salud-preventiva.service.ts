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

  public postSaludPreventiva(matricula: String, responsableDeLlenado: number, edad: number, peso: number, 
    talla: number, grupoSanguineo: number, fuma: Boolean, ingiereBebidasAlcoholicas: Boolean, ingieraOtraSustancia: String,
    usaLentes: Boolean, numeroEmbarazos: number, actividadFisica: Boolean, antecedentesPatologicos: String,
    antecedentesFamiliares: String, metodosAnticonceptivos: String){
    return this.httpClient.post(`${this.baseUrl}/saludPreventivaFormulario`, 
    {
      matricula,
      responsableDeLlenado,
      edad,
      peso,
      talla,
      grupoSanguineo,
      fuma,
      ingiereBebidasAlcoholicas,
      ingieraOtraSustancia,
      usaLentes,
      numeroEmbarazos,
      actividadFisica,
      antecedentesPatologicos,
      antecedentesFamiliares,
      metodosAnticonceptivos
    })
  }

}
