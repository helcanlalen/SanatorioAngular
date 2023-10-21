import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Users } from '../../models/user.model';
import { LoginService } from '../../services/login.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [LoginService, RegisterService]
})
export class ServicesComponent implements OnInit {

  public user: Users;
  public token;
  public identity_Admin;
  public identity_Doctor;
  public identity_Secretary;
  public identity_Client;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService,
    private _registerService: RegisterService
  ) {
    this.user = new Users("", "", "", "", "", "", "", "", "", "", "", "");
  }

  ngOnInit() {
  }

  Register() {
    this._registerService.register(this.user).subscribe(
      response => {
        if (response) {
          console.log(response.user);
          this.status = 'success';
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    )
  }

  Login() {
    this._loginService.LoginGeneral(this.user).subscribe(response => {
      this.identity_Admin = response.admin;
      console.log(this.identity_Admin);
      if (!this.identity_Admin) {
        this.loginDoctor();
      } else {
        this.status = 'success';
        localStorage.setItem('identity-admin', JSON.stringify(this.identity_Admin));
        this.getTokenAdmin();
        this._router.navigate(['/admin-start']);
      }
    },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
          this.loginDoctor();
        }
      }
    )
  }

  loginDoctor() {
    this._loginService.LoginGeneral(this.user).subscribe(response => {
      this.identity_Doctor = response.doctor;
      console.log(this.identity_Doctor)
      if (!this.identity_Doctor) {
        this.loginSecretary();
      } else {
        this.status = 'success';
        localStorage.setItem('identity-doctor', JSON.stringify(this.identity_Doctor));
        this.getTokenDoctor();
        this._router.navigate(['/doctor-start']);
      }
    },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
          this.loginSecretary();
        }
      }
    )
  }

  loginSecretary() {
    this._loginService.LoginGeneral(this.user).subscribe(response => {
      this.identity_Secretary = response.secretary;
      console.log(this.identity_Secretary);
      if (!this.identity_Secretary) {
        this.loginClient()
      } else {
        this.status = 'success';
        localStorage.setItem('identity-secretary', JSON.stringify(this.identity_Secretary));
        this.getTokenSecretary();
        this._router.navigate(['/secretary-start']);
      }
    },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.loginClient()
        }
      }
    )
  }

  loginClient() {
    this._loginService.LoginGeneral(this.user).subscribe(response => {
      this.identity_Client = response.client;
      console.log(this.identity_Client);
      if (!this.identity_Client) {
        this.status = 'error'
      } else {
        this.status = 'success';
        localStorage.setItem('identity-client', JSON.stringify(this.identity_Client));
        this.getTokenClient();
        this._router.navigate(['/client-start']);
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

  getTokenAdmin() {
    this._loginService.LoginGeneral(this.user, 'true').subscribe(response => {
      this.token = response.token;
      console.log(this.token);
      if (this.token <= 0) {
        this.status = 'error';
      } else {
        localStorage.setItem('token-admin', this.token);
      }
    },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  getTokenDoctor() {
    this._loginService.LoginGeneral(this.user, 'true').subscribe(response => {
      this.token = response.token;
      console.log(this.token);
      if (this.token <= 0) {
        this.status = 'error';
      } else {
        localStorage.setItem('token-doctor', this.token);
      }
    },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  getTokenSecretary() {
    this._loginService.LoginGeneral(this.user, 'true').subscribe(response => {
      this.token = response.token;
      console.log(this.token);
      if (this.token <= 0) {
        this.status = 'error';
      } else {
        localStorage.setItem('token-secretary', this.token);
      }
    },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  getTokenClient() {
    this._loginService.LoginGeneral(this.user, 'true').subscribe(response => {
      this.token = response.token;
      console.log(this.token);
      if (this.token <= 0) {
        this.status = 'error';
      } else {
        localStorage.setItem('token-client', this.token);
      }
    },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
}
