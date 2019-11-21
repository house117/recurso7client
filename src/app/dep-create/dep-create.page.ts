import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { NgModel } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MenuController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-dep-create',
  templateUrl: './dep-create.page.html',
  styleUrls: ['./dep-create.page.scss'],
})
export class DepCreatePage implements OnInit {
  deps: any;
  nombre: string;
  porcentaje: string;
  saldo: string;


  

  constructor(
      private activatedRoute: ActivatedRoute,
      private modalCtrl: ModalController,
      private http: HttpClient,
      private router: Router,
      private menuCtrl: MenuController
  ) {}
  ngOnInit() {
      //let id = this.activatedRoute.snapshot.paramMap.get("id");
      this.http.get(`http://localhost:5000/api/departamentos/`).subscribe(res => {
          this.deps = res;
      });
  }

  closeModal() {
      this.modalCtrl.dismiss();
  }
  createDep() {
      console.log("nombre: " + this.nombre);
      console.log("porcentaje: " + this.porcentaje);
      console.log("saldo" + this.saldo);
      
      this.closeModal();
      const headerDict = {
          "Content-Type": "application/json",
          Accept: "application/json"
      };

      const requestOptions = {
          headers: new HttpHeaders(headerDict)
      };
      const data = {
          nombre: this.nombre,
          porcentaje: this.porcentaje,
          saldo: this.saldo
      };
      const body = new HttpParams()
          .set("nombre", this.nombre)
          .set("porcentaje", this.porcentaje)
          .set("saldo", this.saldo);
      this.http.post("http://localhost:5000/api/departamentos/", data).subscribe(
          val => {
              console.log("POST call successful value returned in body", val);
              location.replace("/tabs-d/dep-results");
              
          },
          response => {
              console.log("POST call in error", response);
          },
          () => {
              console.log("The POST observable is now completed.");
          }
      );
  }
  toggleMenu() {
      this.menuCtrl.toggle();
  }

}
