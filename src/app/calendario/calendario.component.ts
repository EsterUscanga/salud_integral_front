import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  //CALENDAR INITIALIZATION
  idiomaLocal: string = 'es'
  loCalendarioValores: any
  cabeceraDiasSemanaArreglo: Array<string> = []
  cuadriculaArreglo: Array<any> = []
  loRangoFechaSeleccionada: any = []
  loValorPrimerDia: number
  loValorUltimoDia: number

  //ICONS
  public faChevronLeft = faChevronLeft
  public faChevronRight = faChevronRight
  constructor() { }

  ngOnInit(): void {
    moment.locale(this.idiomaLocal);
    this.loCalendarioValores = moment();
    this.crearCabecera()
    this.crearCuadricula()
  }

  public navegarMes(numero: number, selectorFecha: String){
    this.loCalendarioValores.add(numero, selectorFecha)
    this.crearCuadricula()
  }

  public puedeNavegarMes(numero: number){
    const fechaClonada = moment(this.loCalendarioValores)
    fechaClonada.add(numero, 'month')
    const fechaMinima = moment().add(-1, 'month')
    const fechaMaxima = moment().add(1, 'year')

    return fechaClonada.isBetween(fechaMinima, fechaMaxima)
  }

  public crearCabecera(){
    const diasSemanaArreglo: Array<number> = [0, 1, 2, 3, 4, 5, 6]
    diasSemanaArreglo.forEach(dia =>{
      this.cabeceraDiasSemanaArreglo.push(moment().weekday(dia).format('ddd'))
    })
    
  }

  public crearCuadricula(){
    this.cuadriculaArreglo = []
    const primerDiaFecha = moment(this.loCalendarioValores).startOf('month')
    const inicialCeldasVacias = primerDiaFecha.weekday()
    const ultimoDiaFecha = moment(this.loCalendarioValores).endOf('month')
    const lastEmptyCells = 6 - ultimoDiaFecha.weekday()
    const diasMes = this.loCalendarioValores.daysInMonth()
    const longitudArreglo = inicialCeldasVacias + lastEmptyCells + diasMes

    for(let i = 0; i < longitudArreglo; i++){
      let fecha: any = {}
      if(i < inicialCeldasVacias || i > inicialCeldasVacias + diasMes -1){
        fecha.valor = 0
        fecha.disponible = false 
      } else {
        fecha.valor = i - inicialCeldasVacias +1
        fecha.disponible = this.estaDisponible(i - inicialCeldasVacias +1) 
      }
      this.cuadriculaArreglo.push(fecha)
    }
    console.log(this.cuadriculaArreglo)
  }

  public estaDisponible(numero: number): boolean{
    let fechasRevisar = this.fechaDesdeNumero(numero, this.loCalendarioValores)
    if(fechasRevisar.isBefore(moment(), 'day')){
      return false;
    } else {
      return true;
    }
  }

  public fechaDesdeNumero(numero: number, fechaReferencia:any):any{
    let fecha = moment(fechaReferencia)
    return fecha.date(numero)
  }

  public seleccionarDia(dia: any, posicionArreglo: number){
    if(dia.disponible){
      if(!this.cuadriculaArreglo[posicionArreglo].seleccionado){
        this.cuadriculaArreglo[posicionArreglo].seleccionado = true
        this.loRangoFechaSeleccionada.push(dia)
        this.ordenarArreglo()
      } else {
        this.cuadriculaArreglo[posicionArreglo].seleccionado = false
        const indice = this.loRangoFechaSeleccionada.indexOf(dia);
        if (indice > -1) {
          this.loRangoFechaSeleccionada.splice(indice, 1);
        }
        this.ordenarArreglo()
      }
    }
  
  }

  public ordenarArreglo(){
    this.loRangoFechaSeleccionada.sort((diaPrimero:any,diaSegundo:any)=>{
      if(diaPrimero.valor < diaSegundo.valor)
        return -1
      if(diaPrimero.valor > diaSegundo.valor)
        return 1
    })


    this.loRangoFechaSeleccionada.forEach((diaSeleccionado: any, index: number) => {
      if(this.loRangoFechaSeleccionada.length == index +1 ){
        diaSeleccionado.ultimoDia = true
      } else {
        if(diaSeleccionado.valor + 1 != this.loRangoFechaSeleccionada[index+1].valor){
          diaSeleccionado.ultimoDia = true
          this.loRangoFechaSeleccionada[index+1].primerDia = true
        } else {
          diaSeleccionado.ultimoDia = false
        }
      }
    })

    this.loRangoFechaSeleccionada[0].primerDia = true

    if(this.loRangoFechaSeleccionada.length > 1){
      this.loRangoFechaSeleccionada[this.loRangoFechaSeleccionada.length -1].ultimoDia = true
    }
  }
  
}
