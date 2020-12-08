import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UsuariosService } from '../services/usuarios.service';
import { EnfermedadesService } from '../services/enfermedades.service';
import { SaludPreventivaService } from '../services/salud-preventiva.service'
import { element } from 'protractor';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-salud-preventiva',
  templateUrl: './salud-preventiva.component.html',
  styleUrls: ['./salud-preventiva.component.css']
})
export class SaludPreventivaComponent implements OnInit {


  //INFO
  public loValorAreaUsuario: String
  public loValorMatricula: String = ''
  public loValorNombre: String
  public loValorSexo: String
  public loValorTalla: number = 0.0
  public loValorPeso: number = 0.0
  public loValorImss: String
  public loValorEdad: number = 0
  public loValorResonsable: { id: number, texto: String }
  public loValorGrupoSanguineo: { id: number, texto: String }
  public loValorAtencedentesPatologicos: [{ id: number, seleccionado: boolean }] = [{ id: 0, seleccionado: true }]
  public loValorAntecedentesFamiliares: [{ id: number, seleccionado: boolean }] = [{ id: 0, seleccionado: true }]
  public loValorMetodosAnticonceptivos: [{ id: number, seleccionado: boolean }] = [{ id: 0, seleccionado: true }]
  public loValorFuma: Boolean = false
  public loValorIngiereBebidasAlcoholicas: Boolean = false
  public loValorOtraSustancia: String = ''
  public loValorNumeroEmbarazos: number = 0
  public loValorDisminucionVisual: Boolean = false
  public loValorPracticaActividadFisica: Boolean = true


  public loStringAntecedentesPatologicos = ''
  public loStringAntecedentesfamiliares = ''
  public loStringMetodosAnticonceptivos = ''

  //LOGIC
  public otraSustancia: Boolean = false
  public detallesBandera: Boolean
  public matriculaIncompleta: Boolean
  public matriculaNoExiste: Boolean
  public mensajeSatisfactorio: Boolean
  public mensajeError: Boolean
  public mensajeAlerta: Boolean
  public responsableLlenadoSinSeleccion: Boolean
  public tallaIncorrecta: Boolean
  public pesoIncorrecto: Boolean
  public edadIncorrecta: Boolean
  public cantidadEmbarazosIncorrecto: Boolean
  public otraSustanciaVacio: Boolean
  public antecedentesPatologicosSinSeleccion: Boolean
  public antecedentesFamiliaresSinSeleccion: Boolean
  public grupoSanguineoSinSeleccion: Boolean
  public metodoAnticonceptivoSinSeleccion: Boolean

  public loValorMensajeSatisfactorio: String
  public loValorMensajeError: String
  public loValorMensajeAlerta: String

  public dropDownActivoResponsableLlenado: Boolean = false
  public dropDownActivoGrupoSanguineo: Boolean = false
  public dropDownActivoAntecedentesFamiliares: Boolean = false

  public responsablesDeLlenado: any
  public gruposSanguineos: any
  public antecedentesPatologicos: any
  public antecedentesFamiliares: any
  public metodosAnticonceptivos: any

  //ICONS
  public faSearch = faSearch
  public faAngleDown = faAngleDown
  public faPaperPlane = faPaperPlane
  public faTrash = faTrash

  constructor(
    private enfermedadesServicio: EnfermedadesService,
    private usuariosServicio: UsuariosService,
    private saludPreventivaServicio: SaludPreventivaService
  ) { }

  ngOnInit(): void {
    this.usuariosServicio.getResponsablesLlenado()
      .subscribe((data: any) => {
        this.responsablesDeLlenado = data
        console.log(this.responsablesDeLlenado)
      }, (error => {
        console.log(error)
      }))

    this.saludPreventivaServicio.getAntecedentesFamiliares()
      .subscribe((data: any) => {
        this.antecedentesFamiliares = data
        data.forEach((element: any, index: number) => {
          let antecedenteFamiliar = { id: element.id, seleccionado: false }
          this.loValorAntecedentesFamiliares[index] = antecedenteFamiliar
        })
        console.log(this.antecedentesFamiliares)
      }, (error => {
        console.log(error)
      }))

    this.saludPreventivaServicio.getGruposSanguineos()
      .subscribe((data: any) => {
        this.gruposSanguineos = data
        console.log(this.gruposSanguineos)
      }, (error => {
        console.log(error)
      }))

    this.enfermedadesServicio.getAntecedentesPatologicos()
      .subscribe((data: any) => {
        this.antecedentesPatologicos = data
        data.forEach((element: any, index: number) => {
          let enfermedadPatologica = { id: element.id, seleccionado: false }
          this.loValorAtencedentesPatologicos[index] = enfermedadPatologica
        })
        console.log(this.antecedentesPatologicos)
      }, (error => {
        console.log(error)
      }))

    this.saludPreventivaServicio.getMetodosAnticonceptivos()
      .subscribe((data: any) => {
        this.metodosAnticonceptivos = data
        data.forEach((element: any, index: number) => {
          let metodoAnticonceptivo = { id: element.id, seleccionado: false }
          this.loValorMetodosAnticonceptivos[index] = metodoAnticonceptivo
        })
        console.log(this.metodosAnticonceptivos)
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
        .subscribe((data: any) => {
          if (!data) {
            this.matriculaNoExiste = true
          } else {
            console.log(data)
            this.detallesBandera = true
            this.loValorSexo = data.sexo == 1 ? 'Femenino' : 'Masculino'
            this.loValorAreaUsuario = data.area
            this.loValorNombre = `${data.nombre} ${data.apellido_paterno} ${data.apellido_materno}`
            this.loValorImss = data.imss
          }

        }, (error => {
          console.log(error)
        }))
    }

  }

  public limpiarValores() {
    this.detallesBandera = false
  }

  public cerrarNotificacion(tipoNotificacion: String) {
    switch (tipoNotificacion) {
      case 'satisfactoria': this.mensajeSatisfactorio = false
        break
      case 'error': this.mensajeError = false
        break
      case 'alerta': this.mensajeAlerta = false
        break
    }
  }

  public cambiarEstatusDropdown(selector: String) {
    switch (selector) {
      case 'responsable': this.dropDownActivoResponsableLlenado = !this.dropDownActivoResponsableLlenado
        break
      case 'grupoSanguineo': this.dropDownActivoGrupoSanguineo = !this.dropDownActivoGrupoSanguineo
        break
    }

  }

  public modificarValorDropdown(indice: number, selector: String) {
    switch (selector) {
      case 'responsable':
        this.loValorResonsable = {
          id: this.responsablesDeLlenado[indice].id,
          texto: this.responsablesDeLlenado[indice].nombre
        }
        break
      case 'grupoSanguineo':
        this.loValorGrupoSanguineo = {
          id: this.gruposSanguineos[indice].id,
          texto: this.gruposSanguineos[indice].nombre
        }
        break
    }

    this.cambiarEstatusDropdown(selector)
  }

  public enviarFormularioSaludPreventiva() {

    if(this.validarFormulario()){
      this.mensajeAlerta = false
      this.saludPreventivaServicio.postSaludPreventiva(this.loValorMatricula, this.loValorResonsable.id, 
        this.loValorEdad, this.loValorPeso, this.loValorTalla, this.loValorGrupoSanguineo.id, this.loValorFuma,
        this.loValorIngiereBebidasAlcoholicas, this.loValorOtraSustancia, this.loValorDisminucionVisual, 
        this.loValorNumeroEmbarazos, this.loValorPracticaActividadFisica, this.loStringAntecedentesPatologicos, this.loStringAntecedentesfamiliares, this.loStringMetodosAnticonceptivos)
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
    } else {
      this.loValorMensajeAlerta = "No se han llenado todos los campos."
      this.mensajeAlerta = true
    }   
  }

  public validarFormulario(): boolean {
    this.responsableLlenadoSinSeleccion = false
    this.pesoIncorrecto = false
    this.tallaIncorrecta = false
    this.edadIncorrecta = false
    this.antecedentesPatologicosSinSeleccion = false
    this.antecedentesFamiliaresSinSeleccion = false
    this.grupoSanguineoSinSeleccion = false
    this.otraSustanciaVacio = false
    this.metodoAnticonceptivoSinSeleccion = false

    this.loStringAntecedentesPatologicos = ''
    this.loStringAntecedentesfamiliares = ''
    this.loStringMetodosAnticonceptivos = ''


    if(!this.loValorResonsable){
      this.responsableLlenadoSinSeleccion = true
      return false
    }

    if (this.loValorEdad < 17 || this.loValorEdad > 120) {
      this.edadIncorrecta = true
      return false
    }

    if (this.loValorPeso < 20 || this.loValorPeso > 300) {
      this.pesoIncorrecto = true
      return false
    }

    if (this.loValorTalla < 0.4 || this.loValorTalla > 2.5) {
      this.tallaIncorrecta = true
      return false
    }

    this.loValorAtencedentesPatologicos.forEach((element: { id: number, seleccionado: boolean }, index: number) => {
      if(element.seleccionado){
        if(index == 0) {
          this.loStringAntecedentesPatologicos = `${element.id}`
        } else {
          this.loStringAntecedentesPatologicos = `${this.loStringAntecedentesPatologicos},${element.id}`
        }
      }
    })

    if(this.loStringAntecedentesPatologicos.length < 1){
      this.antecedentesPatologicosSinSeleccion = true
      return false
    }

    this.loValorAntecedentesFamiliares.forEach((element: { id: number, seleccionado: boolean }, index: number) => {
      if(element.seleccionado){
        if(index == 0) {
          this.loStringAntecedentesfamiliares = `${element.id}`
        } else {
          this.loStringAntecedentesfamiliares = `${this.loStringAntecedentesfamiliares},${element.id}`
        }
      }
    })

    if(this.loStringAntecedentesfamiliares.length < 1){
      this.antecedentesFamiliaresSinSeleccion = true
      return false
    }

    if(!this.loValorGrupoSanguineo){
      this.grupoSanguineoSinSeleccion = true
      return false
    }

    if (this.otraSustancia)
      if (this.loValorOtraSustancia.length < 4) {
        this.otraSustanciaVacio = true
        return false
      }

    if (this.loValorNumeroEmbarazos < 0 || this.loValorNumeroEmbarazos > 20) {
      this.cantidadEmbarazosIncorrecto = true
      return false
    }

    this.loValorMetodosAnticonceptivos.forEach((element: { id: number, seleccionado: boolean }, index: number) => {
      if(element.seleccionado){
        if(index == 0) {
          this.loStringMetodosAnticonceptivos = `${element.id}`
        } else {
          this.loStringMetodosAnticonceptivos = `${this.loStringMetodosAnticonceptivos},${element.id}`
        }
      }
    })

    if(this.loStringMetodosAnticonceptivos.length < 1){
      this.metodoAnticonceptivoSinSeleccion = true
      return false
    }

    return true
  }

}
