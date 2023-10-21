import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Specialities } from "../../models/speciality.model";
import { SpecialitiesService } from '../../services/specialities.service';
import { GLOBAL } from '../../services/global.service';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-specialities',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss'],
  providers: [SpecialitiesService, LoginService]
})

export class SpecialitiesComponent implements OnInit {
  public speciality: Specialities;
  public status: string;
  public identityAdmin;
  public listSpecialty;
  public showData;
  public savedID;
  public url: string;
  public key: string = '';
  public reverse: boolean = false

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _specialityService: SpecialitiesService,
    private _loginService: LoginService,
    private toastr: ToastrService
  ) {
    this.speciality = new Specialities("", "");
    this.identityAdmin = _loginService.getIdentityAdmin();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getSpecialties();
  }

  addSpecialty() {
    this._specialityService.addSpeciality(this.speciality).subscribe(
      response => {
        if (response) {
          console.log(response);
          this.status = 'success';
          this.getSpecialties();
          this.agregar();
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    )
  }

  updateSpecialty() {
    this._specialityService.updateSpeciality(this.showData).subscribe(response => {
      if (!response) {
        this.status = "error";
      } else {
        this.status = "success";
        this.getSpecialties();
      }
    },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this.status = "error";
        }
      }
    )
  }

  deleteSpecialty() {
    this._specialityService.deleteSpeciality(this.savedID).subscribe(
      response => {
        console.log(response);
        this.getSpecialties();
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

  getSpecialties() {
    this._specialityService.getSpecialities().subscribe(response => {
      this.listSpecialty = response;
    });
  }

  getSpecialty(id) {
    this._specialityService.getSpeciality(id).subscribe(response => {
      this.showData = response;
    })
  }

  LogOut(){
    localStorage.clear();
    this.identityAdmin = null;
    this._router.navigate(['/']);
  }

  saveID(ID){
    this.savedID = ID
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;

  agregar() {
    this.toastr.success('Doctor added succesfully!');
  }

  eliminar() {
    this.toastr.success('Doctor eliminated succesfully!');
  }

  actualizar() {
    this.toastr.success('Doctor updated succesfully!');
  }

  cancelar() {
    this.toastr.error('Accion Cancelada');
  }
}