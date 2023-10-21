import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-secretary-start',
  templateUrl: './secretary-start.component.html',
  styleUrls: ['./secretary-start.component.scss'],
  providers: [LoginService]
})
export class SecretaryStartComponent implements OnInit {

  public identitySec;

  constructor(
    private _loginService: LoginService,
    private _router: Router,
  ) {
    this.identitySec = _loginService.getIdentitySecretary();
  }

  ngOnInit() {
  }

  LogOut() {
    localStorage.clear();
    this.identitySec = null;
    this._router.navigate(['/']);
  }

}
