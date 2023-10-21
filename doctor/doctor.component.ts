import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Doctors } from "../../models/doctor.model";
import { DoctorsService } from "../../services/doctors.service";
import { Specialities } from "../../models/speciality.model";
import { SpecialitiesService } from "../../services/specialities.service";
import { LoginService } from "../../services/login.service";
import { Clinics } from "../../models/clinic.model";
import { ClinicService } from "../../services/clinic.service";
import { GLOBAL } from "../../services/global.service";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
  providers: [DoctorsService, SpecialitiesService, ClinicService, LoginService]
})
export class DoctorComponent implements OnInit {

  public doctor: Doctors;
  public status: string;
  public identity;
  public listDoctor;
  public listSpecialty;
  public listClinic;
  public showData;
  public savedID;
  public selected;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _doctorService: DoctorsService,
    private _specialtyService: SpecialitiesService,
    private _clinicService: ClinicService,
    private _loginService: LoginService
  ) {
    this.doctor = new Doctors("", "", "", "", "", "", "", "", "", "", "");
    this.identity = _loginService.getIdentityAdmin();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getAllClinics();
    this.getAllSpecialties();
    
    this.getAllDoctors();
  }

  addDoctor() {
    console.log("añadiendo dctor", this.doctor)
    this._doctorService.addDoctor(this.doctor).subscribe(
      response => {
        if (response) {
          this.status = 'success';
          this.getAllDoctors();
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    )
  }


  updateDoctor() {
    this._doctorService.updateDoctor(this.showData).subscribe(
      response => {
        console.log(this.showData);
        if (!response) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.getAllDoctors();
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

  deleteDoctor() {
    this._doctorService.deleteDoctor(this.savedID).subscribe(
      response => {
        console.log(response);
        this.getAllDoctors();
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

  getAllDoctors() {
    this._doctorService.getDoctors().subscribe(response => {
      this.listDoctor = response;
      console.log(this.listDoctor);
    });
  }

  getAllSpecialties() {
    this._specialtyService.getSpecialities().subscribe(response => {
      this.listSpecialty = response;
      console.log(this.listSpecialty);
    });
  }

  getAllClinics() {
    this._clinicService.getAllClinics().subscribe(response => {
      this.listClinic = response;
      console.log(this.listClinic);
    });
  }

  getSpecialtyId(id) {
    for (let x = 0; x < this.listSpecialty.length; x++) {
      if (this.listSpecialty[x]._id === id) {
        return this.listSpecialty[x].type;
      }
    }
  }

  getClinicId(id) {
    for (let x = 0; x < this.listClinic.length; x++) {
      if (this.listClinic[x]._id === id) {
        return this.listClinic[x].name;
      }
    }
  }

  getDoctor(doctorID) {
    this._doctorService.getDoctor(doctorID).subscribe(response => {
      console.log(response);
      this.showData = response;
    })
  }

  LogOut(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }

  saveID(ID) {
    this.savedID = ID
  }

}
