import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Clients } from "../../models/client.model";
import { ClientService } from "../../services/client.service";
import { LoginService } from "../../services/login.service"; 
import { GLOBAL } from "../../services/global.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [ClientService, LoginService]
})
export class ClientComponent implements OnInit {

  public client: Clients;
  public status: string;
  public identity;
  public listClient;
  public showData;
  public savedID;
  public selected;
  public url: string;
  key: string = '';
  reverse: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clientService: ClientService,
    private _loginService: LoginService
  ) {
    this.client = new Clients("", "", "", "", "", "", "", "", "","");
    this.identity = _loginService.getIdentityAdmin();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getAllClients();
  }

  addClient() {
    console.log(this.client)
    this._clientService.addClient(this.client).subscribe(
      response => {
        if (response) {
          this.status = 'success';
          this.getAllClients();
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    )
  }

  updateClient() {
    this._clientService.updateClient(this.showData).subscribe(
      response => {
        console.log(this.showData);
        if (!response) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.getAllClients();
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

  deleteClient() {
    this._clientService.deleteClient(this.savedID).subscribe(
      response => {
        console.log(response);
        this.getAllClients();
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

  getAllClients() {
    this._clientService.getAllClients().subscribe(response => {
      this.listClient = response;
      console.log(this.listClient);
    });
  }

  getClient(clientID) {
    this._clientService.getClient(clientID).subscribe(response => {
      console.log(response);
      this.showData = response;
    })
  }

  LogOut(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }

  agregarCita(idPaciente){
    this._router.navigate(['/seleccionar-fecha', idPaciente]);
  }

  saveID(ID) {
    this.savedID = ID
  }


}
