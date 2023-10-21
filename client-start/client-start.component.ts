import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";
import { GLOBAL } from "../../services/global.service";


@Component({
  selector: 'app-client-start',
  templateUrl: './client-start.component.html',
  styleUrls: ['./client-start.component.scss'],
  providers: [LoginService]
})
export class ClientStartComponent implements OnInit {

  public identity;
  public url: string;

  constructor(
    private _loginService: LoginService,
    private _router: Router,
  ) {
    this.identity = _loginService.getIdentityClient();
    this.url = GLOBAL.url;

  }

  ngOnInit() {
  }

  LogOut() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }

}
