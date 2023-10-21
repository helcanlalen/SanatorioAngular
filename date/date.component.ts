import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Dates } from "../../models/date.model";
import { Citas } from "../../models/test.model";
import { DateService } from "../../services/date.service";
import { Clients } from "../../models/client.model";
import { ClientService } from "../../services/client.service";
import { Doctors } from "../../models/doctor.model";
import { DoctorsService } from "../../services/doctors.service";
import { LoginService } from "../../services/login.service"; 
import { GLOBAL } from "../../services/global.service";

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [DateService, ClientService, DoctorsService, LoginService]
})
export class DateComponent implements OnInit {

  public date: Dates;
  public cita: Citas;
  public client: Clients;
  public doctor: Doctors;
  public status: string;
  public url: string;
  public identitySec;
  public listDate;
  public listClient;
  public listDoctor;
  public showData;
  public savedID;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dateService: DateService,
    private _clientService: ClientService,
    private _doctorService: DoctorsService,
    private _loginService: LoginService
  ) {
    this.date = new Dates("", "", "", "", "");
    this.cita = new Citas("", "", "", "", "");
    this.identitySec = _loginService.getIdentityAdmin();
    this.url = GLOBAL.url;
  }

  ngOnInit() {  
    this.getAllClients();
    this.getAllDoctors();
    this.getAllDates();
  }

  addDate() {
    console.log("add date")
    console.log(this.date)
    console.log(this.cita)
    this._dateService.addDate(this.cita).subscribe(
      response => {
        if (response) {
          this.status = 'success';
          this.getAllDates();
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    )
  }

  updateDate() {
    this._dateService.updateDate(this.showData).subscribe(
      response => {
        console.log(this.showData);
        if (!response) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.getAllDates();
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  deleteDate() {
    this._dateService.deleteDate(this.savedID).subscribe(
      response => {
        console.log(response);
        this.getAllDates();
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  getAllDates() {
    this._dateService.getAllDates().subscribe(response => {
      this.listDate = response;
      console.log(this.listDate);
    });
  }

  getAllClients() {
    this._clientService.getAllClients().subscribe(response => {
      this.listClient = response;
      console.log(this.listClient);
    });
  }

  getAllDoctors() {
    this._doctorService.getDoctors().subscribe(response => {
      this.listDoctor = response;
      console.log(this.listDoctor);
    });
  }

  getDate(dateID) {
    console.log("hola")
    this._dateService.getDate(dateID).subscribe(response => {
      console.log(response);
      this.showData = response;
    })
  }

  getClientId(id) {
    for (let x = 0; x < this.listClient.length; x++) {
      if (this.listClient[x]._id === id) {
        return this.listClient[x].firstName;
      }
    }
  }

  getDoctorId(id) {
    
    for (let x = 0; x < this.listDoctor.length; x++) {
      if (this.listDoctor[x]._id === id) {
        return this.listDoctor[x].firstName;
      }
    }
  }

  LogOut(){
    localStorage.clear();
    this.identitySec = null;
    this._router.navigate(['/']);
  }

  saveID(ID) {
    this.savedID = ID
  }

}
