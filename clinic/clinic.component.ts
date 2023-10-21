import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Clinics } from "../../models/clinic.model";
import { ClinicService } from "../../services/clinic.service";
import { LoginService } from "../../services/login.service"; 
import { GLOBAL } from "../../services/global.service";

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss'],
  providers: [ClinicService, LoginService]
})
export class ClinicComponent implements OnInit {

  public clinic: Clinics;
  public status: string;
  public identityAdmin;
  public listClinic;
  public showData;
  public savedID;
  public selected;
  public url: string;
  key: string = '';
  reverse: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clinicService: ClinicService,
    private _loginService: LoginService
  ) {
    this.clinic = new Clinics("", "", "", "", "", "");
    this.identityAdmin = _loginService.getIdentityAdmin();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getAllClinics();
  }

  addClinic() {
    this._clinicService.addClinic(this.clinic).subscribe(
      response => {
        if (response) {
          this.status = 'success';
          this.getAllClinics();
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    )
  }

  updateClinic() {
    this._clinicService.updateClinic(this.showData).subscribe(
      response => {
        console.log(this.showData);
        if (!response) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.getAllClinics();
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

  deleteClinic() {
    this._clinicService.deleteClinic(this.savedID).subscribe(
      response => {
        console.log(response);
        this.getAllClinics();
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

  getAllClinics() {
    this._clinicService.getAllClinics().subscribe(response => {
      this.listClinic = response;
      console.log(this.listClinic);
    });
  }

  getClinic(clinicID) {
    this._clinicService.getClinic(clinicID).subscribe(response => {
      console.log(response);
      this.showData = response;
    })
  }

  saveID(ID) {
    this.savedID = ID
  }

  LogOut(){
    localStorage.clear();
    this.identityAdmin = null;
    this._router.navigate(['/']);
  }

}
