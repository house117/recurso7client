import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { NgModel } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoadingController } from '@ionic/angular';
import { IonList, ToastController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
@Component({
    selector: "app-dep-create",
    templateUrl: "./dep-create.page.html",
    styleUrls: ["./dep-create.page.scss"]
})
export class DepCreatePage implements OnInit {
    deps: any;
    nombre: string;
    porcentaje: string;
    saldo: string;
    @ViewChild('lista') lista: IonList;
    constructor(
        private activatedRoute: ActivatedRoute,
        private modalCtrl: ModalController,
        private toastCtrl: ToastController,
        private http: HttpClient,
        private router: Router,
        private loadingCtrl: LoadingController,
        private menuCtrl: MenuController
    ) { }
    ngOnInit() {
        //let id = this.activatedRoute.snapshot.paramMap.get("id");
        this.http
            .get(`http://localhost:5000/api/departamentos/`)
            .subscribe(res => {
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
        this.http
            .post("http://localhost:5000/api/departamentos/", data)
            .subscribe(
                val => {
                    console.log(
                        "POST call successful value returned in body",
                        val
                    );
                    this.present("Agregando departamento...");
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

    isLoading = false;


    async present(message: string) {
        this.isLoading = true;
        return await this.loadingCtrl.create({
            message,
            duration: 3000,
        }).then(a => {
            a.present().then(() => {
                
                location.replace("/tabs-d/dep-results");
                
                
               

                if (this.isLoading) {
                    
                    a.dismiss().then(() => this.presentToast('Porcentaje invalido!'));
                }
            });
        });
    }

    async dismiss() {
        this.isLoading = false;
        return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
    }
    async presentToast(message: string) {
        const toast = await this.toastCtrl.create({
            message,
            duration: 2000
        });
        toast.present();
    }

}
