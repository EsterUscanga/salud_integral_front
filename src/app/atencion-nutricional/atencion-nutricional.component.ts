import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UsuariosService } from '../services/usuarios.service';
import { AtencionNutricionalService } from '../services/atencion-nutricional.service';

@Component({
  selector: 'app-atencion-nutricional',
  templateUrl: './atencion-nutricional.component.html',
  styleUrls: ['./atencion-nutricional.component.css']
})
export class AtencionNutricionalComponent implements OnInit {

  //INFO
  public loValorAreaUsuario: String
  public loValorMatricula: String = ''
  public loValorNombre: String
  public loValorSexo: String
  public loValorTalla: number = 0.0
  public loValorPeso: number = 0.0
  public loValorIMC: number

  //LOGIC
  public detallesBandera: Boolean
  public matriculaIncompleta: Boolean
  public matriculaNoExiste: Boolean
  public tallaIncorrecta: Boolean
  public pesoIncorrecto:Boolean
  public mensajeSatisfactorio: Boolean
  public mensajeError: Boolean
  public loValorMensajeSatisfactorio: String
  public loValorMensajeError: String

  //ICONS
  public faSearch = faSearch
  public faCalculator = faCalculator
  public faPaperPlane = faPaperPlane
  public faTrash = faTrash
  
  constructor(
    private atencionNutricionalServicio: AtencionNutricionalService,
    private usuariosServicio: UsuariosService
  ) { }

  ngOnInit(): void {

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
          this.loValorSexo = data.sexo == 1 ? 'Femenino' : 'Masculino'
          this.loValorAreaUsuario = data.area
          this.loValorNombre = `${data.nombre} ${data.apellido_paterno} ${data.apellido_materno}`
        }
        
      }, (error => {
        console.log(error)
      }))
    }

  }

  public obtenerIMC() {
    this.pesoIncorrecto = false
    this.tallaIncorrecta = false
    if(this.loValorPeso < 20 || this.loValorPeso > 300) { 
      this.pesoIncorrecto = true
    }
    if( this.loValorTalla < 0.4 || this.loValorTalla > 2.5) {
      this.tallaIncorrecta = true
    }  
    if(!this.pesoIncorrecto && !this.tallaIncorrecta){
      this.loValorIMC = this.loValorPeso / Math.pow(this.loValorTalla, 2)
    }
  }

  public limpiarValores() {
    this.detallesBandera = false
    this.loValorIMC = undefined
  }

  public enviarFormularioAtencionNutricional(){
    this.atencionNutricionalServicio.postAtencionNutricional(this.loValorMatricula, this.loValorTalla, this.loValorPeso, this.loValorIMC)
    .subscribe(((data:any) =>{
      if(data.status){
        this.loValorMensajeSatisfactorio = data.status
        this.mensajeSatisfactorio = true
        this.limpiarValores()
      }
    }), (error => {
      if(error.error){
        this.loValorMensajeError = error.error
        this.mensajeError = true
        this.limpiarValores()
      }
    }))
  }

  public cerrarNotificacion(tipoNotificacion: String){
    switch(tipoNotificacion){
      case 'satisfactoria': this.mensajeSatisfactorio = false
      break
      case 'error': this.mensajeError = false
      break
    }
  }

}
