import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Admins } from "../../models/admin.model";
import { AdminService } from "../../services/admin.service";
import { LoginService } from "../../services/login.service"; 
import { GLOBAL } from "../../services/global.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [AdminService, LoginService]
})
export class AdminComponent implements OnInit {

  public admin: Admins;
  public status: string;
  public identityAdmin;
  public listAdmin;
  public showData;
  public savedID;
  public selected;
  public url: string;
  key: string = '';
  reverse: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _adminService: AdminService,
    private _loginService: LoginService
  ) {
    this.admin = new Admins("", "", "", "", "", "", "", "", "");
    this.identityAdmin = _loginService.getIdentityAdmin();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getAllAdmins();
  }

  addAdmin() {
    this._adminService.addAdmin(this.admin).subscribe(
      response => {
        if (response) {
          this.status = 'success';
          this.getAllAdmins();
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    )
  }

  updateAdmin() {
    this._adminService.updateAdmin(this.showData).subscribe(
      response => {
        console.log(this.showData);
        if (!response) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.getAllAdmins();
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

  deleteAdmin() {
    this._adminService.deleteAdmin(this.savedID).subscribe(
      response => {
        console.log(response);
        this.getAllAdmins();
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

  getAllAdmins() {
    this._adminService.getAllAdmins().subscribe(response => {
      this.listAdmin = response;
      console.log(this.listAdmin);
    });
  }

  getAdmin(adminID) {
    this._adminService.getAdmin(adminID).subscribe(response => {
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
