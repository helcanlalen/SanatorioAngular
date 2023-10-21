import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Bills } from "../../models/bill.model";
import { BillService } from "../../services/bill.service";
import { LoginService } from "../../services/login.service"; 
import { GLOBAL } from "../../services/global.service";
import { Clients } from "../../models/client.model";
import { ClientService } from "../../services/client.service";
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
  providers: [BillService,ClientService, LoginService ]
})
export class BillComponent implements OnInit {

  public bill: Bills;
  public status: string;
  public identity;
  public listBill;
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
    private _billService: BillService,
    private _clientService: ClientService,
    private _loginService: LoginService
  ) {
    this.bill = new Bills("", "", "", "", "", "");
    this.identity = _loginService.getIdentityAdmin();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.getAllClients();
    this.getAllBills();
  }

  addBill() {
    this._billService.addBill(this.bill).subscribe(
      response => {
        if (response) {
          this.status = 'success';
          this.getAllBills();
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    )
  }

  updateBill() {
    this._billService.updateBill(this.showData).subscribe(
      response => {
        console.log(this.showData);
        if (!response) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.getAllBills();
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

  deleteBill() {
    this._billService.deleteBill(this.savedID).subscribe(
      response => {
        console.log(response);
        this.getAllBills();
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

  getAllBills() {
    this._billService.getAllBills().subscribe(response => {
      this.listBill = response;
      console.log(this.listBill);
    });
  }

  getAllClients() {
    this._clientService.getAllClients().subscribe(response => {
      this.listClient = response;
      console.log(this.listClient);
    });
  }

  getClientId(id) {
    for (let x = 0; x < this.listClient.length; x++) {
      if (this.listClient[x]._id === id) {
        return this.listClient[x].firstName;
      }
    }
  }

  getBill(billID) {
    this._billService.getBill(billID).subscribe(response => {
      console.log(response);
      this.showData = response;
    })
  }

  saveID(ID) {
    this.savedID = ID
  }

  LogOut(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }

}
