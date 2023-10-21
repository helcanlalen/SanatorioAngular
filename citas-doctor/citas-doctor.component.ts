import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service"; 
import { Citas } from "../../models/cita.model";
import { CitaService } from "../../services/cita.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-citas-doctor',
  templateUrl: './citas-doctor.component.html',
  styleUrls: ['./citas-doctor.component.scss'],
  providers: [LoginService, CitaService, DatePipe]
})
export class CitasDoctorComponent implements OnInit {
  public listDate;
  public showData;
  public fecha;
  public datepipe: DatePipe
  public opcionesDeFormato;
  
  constructor(
    private _citaService: CitaService,
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    this.buscarAgendaByDoctor(this._loginService.getIdentityDoctor());
    //console.log('doctor', this._loginService.getIdentityDoctor());
  }
  
  buscarAgendaByDoctor(doctor) {
    console.log("Identificador del doctor", doctor._id); // Muestra el objeto JSON en la consola

    const fecha = new Date(); // Obtén la fecha que deseas formatear
    const fechaFormateada = this.formatearFecha(fecha);
    console.log(fechaFormateada); // Imprime la fecha formateada en "yyy


    /*console.log("Json citas", objCitas); // Muestra el objeto JSON en la consola

    this._citaService.serchAgenda(objCitas).subscribe(response => {
      this.showData = response;
    })*/

  }

  formatearFecha(fecha: Date): string {
    const year = fecha.getFullYear().toString();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Agrega cero a la izquierda si es necesario
    const day = fecha.getDate().toString().padStart(2, '0');
  
    return `${year}/${month}/${day}`;
  }

}
