import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Clients } from "../../models/client.model";
import { ClientService } from "../../services/client.service";
import { UploadService } from "../../services/upload.service";
import { GLOBAL } from "../../services/global.service";
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ClientService, UploadService, LoginService]
})
export class ProfileComponent implements OnInit {

  public client: Clients;
  public identity;
  public token;
  public status: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService,
    private _clientService: ClientService,
    private _uploadService: UploadService
  ) {
    this.client = this._clientService.getIdentity();
    this.identity = this.client;
    this.token = this._loginService.getTokenClient();
    this.url = GLOBAL.url;

  }

  ngOnInit() {
    console.log("Identity para Update")
    console.log(this.identity);
  }

  updateProfile() {
    this._clientService.updateClient(this.client).subscribe(
      response => {
        if (!response.client) {
          this.status = 'error';
        } else {
          this.status = 'success';
          localStorage.setItem('identity-client', JSON.stringify(this.client));
          this.identity = this.client;

          //Subida de imagen
          this._uploadService.makeFileRequest(this.url + 'upload/' + this.client._id, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              this.client.image = result.client.image;
              localStorage.setItem('identity-client', JSON.stringify(this.client));
            })
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

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
