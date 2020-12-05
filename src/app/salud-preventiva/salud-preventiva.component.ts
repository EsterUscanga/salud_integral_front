import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UsuariosService } from '../services/usuarios.service';
import { EnfermedadesService } from '../services/enfermedades.service';
import { SaludPreventivaService } from '../services/salud-preventiva.service'

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
  public loValorIngerieBebidasAlcoholicas: Boolean = false
  public loValorOtraSustancia: String
  public loValorNumeroEmbarazos: Number = 0
  public loValorDisminucionVisual: Boolean
  public loValorPracticaActividadFisica: Boolean


  //LOGIC
  public otraSustancia: Boolean
  public detallesBandera: Boolean
  public matriculaIncompleta: Boolean
  public matriculaNoExiste: Boolean
  public mensajeSatisfactorio: Boolean
  public mensajeError: Boolean
  public tallaIncorrecta: Boolean
  public pesoIncorrecto: Boolean
  public edadIncorrecta: Boolean
  public cantidadEmbarazosIncorrecto: Boolean
  public otraSustanciaVacio: Boolean
  public loValorMensajeSatisfactorio: String
  public loValorMensajeError: String
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

  public enviarFormularioJustificacionFaltas() {
    this.pesoIncorrecto = false
    this.tallaIncorrecta = false
    this.edadIncorrecta = false
    this.otraSustanciaVacio = false

    if (this.loValorPeso < 20 || this.loValorPeso > 300) {
      this.pesoIncorrecto = true
    }

    if (this.loValorTalla < 0.4 || this.loValorTalla > 2.5) {
      this.tallaIncorrecta = true
    }

    if (this.loValorEdad < 18 || this.loValorEdad > 120) {
      this.edadIncorrecta = true
    }

    if (this.otraSustancia)
      if (this.loValorOtraSustancia.length < 4) {
        this.otraSustanciaVacio = true
      }

    if (this.loValorNumeroEmbarazos < 0 || this.loValorNumeroEmbarazos > 20) {
      this.cantidadEmbarazosIncorrecto = true
    }

  }

  public guardarSeleccionBotonRadio(valorSeleccionado: any, radioSeleccionado: String) {
    switch (radioSeleccionado) {
      case 'fuma':
        this.loValorFuma = valorSeleccionado == '0'
        break

      case 'toma':
        this.loValorIngerieBebidasAlcoholicas = valorSeleccionado == '0'
        break

      case 'sustancia':
        this.otraSustancia = valorSeleccionado == '0'
        this.loValorOtraSustancia = valorSeleccionado == '1' ? "" : this.loValorOtraSustancia
        break

      case 'disminucion_visual':
        this.loValorDisminucionVisual = valorSeleccionado == '0'
        break

      case 'actividad_fisica':
        this.loValorPracticaActividadFisica = valorSeleccionado == '0'
        break
    }
  }

}
