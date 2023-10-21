import { Component, OnInit } from '@angular/core';
import { Horarios } from "../../models/horario.model";
import { SpecialitiesService } from "../../services/specialities.service";
import { LoginService } from "../../services/login.service";
import { CitaService } from "../../services/cita.service";
import { ClientService } from "../../services/client.service";
import { GLOBAL } from "../../services/global.service";
import { Busquedas } from "../../models/busqueda.model";
import { Citas } from "../../models/cita.model";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seleccionar-fecha',
  templateUrl: './seleccionar-fecha.component.html',
  styleUrls: ['./seleccionar-fecha.component.scss'],
  providers: [SpecialitiesService, LoginService, CitaService, ClientService]
})
export class SeleccionarFechaComponent implements OnInit {

  public busqueda: Busquedas;
  public cita: Citas;
  public url: string;
  public status: string;

  public identity;
  public listSpecialty;
  public especialidad;
  public fecha;
  public showData;
  public clientData;
  public showHorarios;
  public doctorSelected;
  public horaSelected;

  public idPaciente;

  horarios1: string[] = [];

  constructor(
    private _specialtyService: SpecialitiesService,
    private _citaService: CitaService,
    private _clientService: ClientService,
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.busqueda = new Busquedas("", "");
    this.cita = new Citas("", "", "", "", "", "");
    this.identity = _loginService.getIdentityAdmin();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getAllSpecialties();
    this.getClient(this._activatedRoute.snapshot.paramMap.get('id-paciente'));
  }

  getAllSpecialties() {
    this._specialtyService.getSpecialities().subscribe(response => {
      this.listSpecialty = response;
      console.log(this.listSpecialty);
    });
  }

  buscarDoctores() {
    console.log("Id especialidad", this.busqueda)
    this._citaService.searchDoctor(this.busqueda).subscribe(response => {
      console.log(response);
      this.showData = response;
    })
  }

  buscarAgendaByDoctor(doctor) {
    this.doctorSelected = doctor;
    this.showHorarios = true;
    const objCitas = {
      fecha: this.busqueda.fecha,
      doctor: doctor
    };

    console.log("Json citas", objCitas); // Muestra el objeto JSON en la consola

    this._citaService.serchAgenda(objCitas).subscribe(response => {
      this.getHorariosDisponibles()
      response.forEach(item => {
        console.log(item.horario)
        const indice = this.horarios1.indexOf(item.horario)

        if (indice !== -1) {
          this.horarios1.splice(indice, 1)
        }
      })
    })

  }

  formatHorario(horario): string {
    if (horario == 7) {
      return "07:00";
    }

    if (horario == 8) {
      return "08:00";
    }

    if (horario == 9) {
      return "09:00";
    }

    if (horario == 10) {
      return "10:00";
    }

    if (horario == 11) {
      return "11:00";
    }

    if (horario == 12) {
      return "12:00";
    }

    if (horario == 13) {
      return "13:00";
    }
  }

  /*detalleDoctor(){
    this.showHorarios = true;
  }*/

  addCita(horario) {
    this.showHorarios = true;
    this.cita.doctor = this.doctorSelected;
    this.cita.fecha = this.busqueda.fecha;
    this.cita.paciente = this.clientData._id;
    this.cita.estado = 'CONFIRMADA';

    console.log("añadiendo cita", this.cita)
    this._citaService.addCita(this.cita).subscribe(
      response => {
        if (response) {
          this.status = 'success';
          //this.getAllDoctors();
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
        this.showToast()
      }
    )

  }

  getClient(clientID) {
    this._clientService.getClient(clientID).subscribe(response => {
      console.log("Cliente", response);
      this.clientData = response;
    })
  }

  //public horario: Horarios;

  // fechaSeleccionada: Date | null = null;
  // horarios1: string[] = [];

  // constructor(
  //   private _specialtyService: SpecialitiesService,
  // ) {}

  // public horario: Horarios[] = [
  //   {
  //     id: 1,
  //     nombre: 'Dr. Juan Pérez',
  //     horarios: [
  //       '09:00 AM',
  //       '10:30 AM',
  //       '02:00 PM',
  //     ]
  //   },
  //   {
  //     id: 2,
  //     nombre: 'Dra. María Rodríguez',
  //     horarios: [
  //       '08:30 AM',
  //       '11:00 AM',
  //       '03:30 PM',
  //     ]
  //   },
  // ];

  seleccionarFecha(fecha: Date | null): void {
    //this.fechaSeleccionada = fecha;
    // Aquí deberías implementar la lógica para cargar los horarios disponibles para la fecha seleccionada desde tu fuente de datos.
    // En este ejemplo, utilizamos un arreglo local como simulación.
    console.log('jeje');
    //this.horarios1 = this.getHorariosDisponibles();
  }

  getHorariosDisponibles(): void {
    // Simulación de horarios disponibles para una fecha.
    this.horarios1 = [
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
    ];
  }

  showToast() {
    this.toastr.success('Mensaje de éxito', 'Título del Toast');
  }
}


