import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { UploadService } from "../../services/upload.service";
import { Admins } from "../../models/admin.model";
import { Router } from "@angular/router";
import { GLOBAL } from "../../services/global.service";

@Component({
  selector: 'app-admin-start',
  templateUrl: './admin-start.component.html',
  styleUrls: ['./admin-start.component.scss'],
  providers: [LoginService, UploadService]
})
export class AdminStartComponent implements OnInit {

  public admin: Admins;
  public identityAdmin;
  public url: string;
  public identity;
  public token;
  public status: string;

  constructor(
    private _router: Router,
    private _loginService: LoginService,
    private _uploadService: UploadService
  ) {
    this.identity = this._loginService.getIdentityAdmin();
    this.token = this._loginService.getTokenAdmin();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
  }

  LogOut() {
    localStorage.clear();
    this.identityAdmin = null;
    this._router.navigate(['/']);
  }

  onSubmit() {
    console.log(this.identity);
    //Subida de imagen
    this._uploadService.makeFileRequest(this.url + 'update-image-user/' + this.identity._id, [], this.filesToUpload, this.token, 'image')
      .then((result: any) => {
        console.log(result);
        this.identity.image = result.identity.image;
        localStorage.setItem('identity', JSON.stringify(this.identity));
      })
  }


  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

}
