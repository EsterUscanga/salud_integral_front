import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UsuariosService } from '../services/usuarios.service';
import { EnfermedadesService } from '../services/enfermedades.service';

@Component({
  selector: 'app-justificacion-faltas',
  templateUrl: './justificacion-faltas.component.html',
  styleUrls: ['./justificacion-faltas.component.css']
})


export class JustificacionFaltasComponent implements OnInit {

  //INFO
  public loValorAreaUsuario: String
  public loValorMatricula: String = ''
  public loValorNombre: String
  public loValorCuatrimestre: {id: number, texto: String}
  public loValorEnfermedad: {id: number, texto: String}
  public loValorDecripcionEnfermedad: String

  //LOGIC
  public detallesBandera: Boolean
  public matriculaIncompleta: Boolean
  public matriculaNoExiste: Boolean
  public mensajeSatisfactorio: Boolean
  public mensajeError: Boolean
  public loValorMensajeSatisfactorio: String
  public loValorMensajeError: String
  public dropDownActivoCuatrimestre: Boolean = false
  public dropDownActivoEnfermedad: Boolean = false

  public enfermedades: any
  public cuatrimestres: String[] = ["Propedeutico", 
                                   "1° Cuatrimestre",
                                   "2° Cuatrimestre",
                                   "3° Cuatrimestre",
                                   "4° Cuatrimestre",
                                   "5° Cuatrimestre",
                                   "6° Cuatrimestre",
                                   "7° Cuatrimestre",
                                   "8° Cuatrimestre",
                                   "9° Cuatrimestre",
                                   "10° Cuatrimestre",]

  //ICONS
  public faSearch = faSearch
  public faAngleDown = faAngleDown
  public faPaperPlane = faPaperPlane
  public faTrash = faTrash

  constructor(
    private enfermedadesServicio: EnfermedadesService,
    private usuariosServicio: UsuariosService
  ) { }

  ngOnInit(): void {
    this.enfermedadesServicio.getClasificacionEnfermedades()
    .subscribe((data:any) =>{
      this.enfermedades = data
      console.log(this.enfermedades)
    }, (error => {
      console.log(error)
    }))
  }

  public obtenerDetallesUsuarioPorMatricula() {
    this.matriculaNoExiste = false
    this.limpiarValores()
    if (this.loValorMatricula.length < 6 || this.loValorMatricula.length > 6) {
      this.matriculaIncompleta = true
    } else {
      this.matriculaIncompleta = false
      this.usuariosServicio.getUsuariosPorMatricula(this.loValorMatricula)
      .subscribe((data: any) =>{
        if(!data) {
          this.matriculaNoExiste = true
        } else {
          console.log(data)
          this.detallesBandera = true
          this.loValorAreaUsuario = data.area
          this.loValorNombre = `${data.nombre} ${data.apellido_paterno} ${data.apellido_materno}`
        }
        
      }, (error => {
        console.log(error)
      }))
    }

  }

  public limpiarValores() {
    this.detallesBandera = false
  }

  public cerrarNotificacion(tipoNotificacion: String){
    switch(tipoNotificacion){
      case 'satisfactoria': this.mensajeSatisfactorio = false
      break
      case 'error': this.mensajeError = false
      break
    }
  }

  public cambiarEstatusDropdown(selector: String){
    switch(selector){
      case 'cuatrimestre': this.dropDownActivoCuatrimestre = !this.dropDownActivoCuatrimestre
      break
      case 'enfermedad': this.dropDownActivoEnfermedad = !this.dropDownActivoEnfermedad
      break
    }
    
  }

  public modificarValorDropdown(indice: number, selector: String){
    switch(selector){
      case 'cuatrimestre':  
      this.loValorCuatrimestre = {
        id: indice,
        texto: this.cuatrimestres[indice]
      }
      break
      case 'enfermedad': 
      this.loValorEnfermedad = {
        id: this.enfermedades[indice].id,
        texto: this.enfermedades[indice].nombre
      }
      break
    }
   
    this.cambiarEstatusDropdown(selector)
  }

  public enviarFormularioJustificacionFaltas(){
    console.log("Cuatrimestre:" + JSON.stringify(this.loValorCuatrimestre))
    console.log("Enfermedad:" + JSON.stringify(this.loValorEnfermedad))
    console.log("Descripcion enfermedad:" + JSON.stringify(this.loValorDecripcionEnfermedad))

  }
}
