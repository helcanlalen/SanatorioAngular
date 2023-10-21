import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service"; 
import { Router } from "@angular/router";

@Component({
  selector: 'app-doctor-start',
  templateUrl: './doctor-start.component.html',
  styleUrls: ['./doctor-start.component.scss'],
  providers: [LoginService]
})
export class DoctorStartComponent implements OnInit {

  public identityDoctor;

  constructor(
    private _loginService: LoginService,
    private _router: Router,
  ) { 
    this.identityDoctor = _loginService.getIdentityDoctor();
  }

  ngOnInit() {
  }

  LogOut() {
    localStorage.clear();
    this.identityDoctor = null;
    this._router.navigate(['/']);
  }

}
