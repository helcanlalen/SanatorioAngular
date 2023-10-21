import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Secretaries } from "../../models/secretary.model";
import { SecretariesService } from '../../services/secretaries.service';
import { Clinics } from "../../models/clinic.model";
import { ClinicService } from '../../services/clinic.service';
import { GLOBAL } from '../../services/global.service';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretaries.component.html',
  styleUrls: ['./secretaries.component.scss'],
  providers: [SecretariesService, ClinicService, LoginService]
})

export class SecretariesComponent implements OnInit {
  public secretary: Secretaries;
  public clinic: Clinics;
  public boolean: string;
  public identity;
  public listSecretary;
  public listClinic;
  public showData;
  public savedID;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _secretaryService: SecretariesService,
    private _clinicService: ClinicService,
    private _loginService: LoginService,
    private toastr: ToastrService
  ) {
    this.secretary = new Secretaries("", "", "", "", "", "", "", "", "", "");
    this.identity = _loginService.getIdentityAdmin();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getClinics();
    this.getSecretaries();
  }

  addSecretary() {
    this._secretaryService.addSecretary(this.secretary).subscribe(
      response => {
        if (response) {
          console.log(response);
          this.boolean = 'success';
          this.getSecretaries();
        }
      },
      error => {
        console.log(<any>error);
        this.boolean = 'error';
      }
    )
  }

  updateSecretary() {
    this._secretaryService.updateSecretary(this.showData).subscribe(response => {
      if (!response) {
        this.boolean = "error";
      } else {
        this.boolean = "success";
        this.getSecretaries();
      }
    },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this.boolean = "error";
        }
      }
    )
  }

  deleteSecretary() {
    this._secretaryService.deleteSecretary(this.savedID).subscribe(
      response => {
        console.log(response);
        this.getSecretaries();
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.boolean = 'error';
        }
      }
    )
  }

  getCenterID(id) {
    for (let x = 0; x < this.listClinic.length; x++) {
      if (this.listClinic[x]._id === id) {
        return this.listClinic[x].name;
      }
    }
  }

  getSecretaries() {
    this._secretaryService.getSecretaries().subscribe(response => {
      this.listSecretary = response;
    });
  }

  getSecretary(id) {
    this._secretaryService.getSecretary(id).subscribe(response => {
      this.showData = response;
    })
  }

  getClinics() {
    this._clinicService.getAllClinics().subscribe(response => {
      this.listClinic = response;
    })
  }

  filterCenter(centerID) {
    console.log(centerID)
    this._secretaryService.getFilter(centerID).subscribe(response => {
      this.listSecretary = response;
      console.log(response)
    });
  }

  LogOut(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }

  saveID(ID){
    this.savedID = ID
  }
}
