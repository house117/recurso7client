import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { NgModel } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MenuController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: "app-miembros-create",
    templateUrl: "./miembros-create.page.html",
    styleUrls: ["./miembros-create.page.scss"]
})
export class MiembrosCreatePage implements OnInit {
    usuarios: any;
    nombre: string;
    apellidos: string;
    cargo: string;
    email: string;



    constructor(
        private activatedRoute: ActivatedRoute,
        private modalCtrl: ModalController,
        private http: HttpClient,
        private router: Router,
        private menuCtrl: MenuController,
        private loadingCtrl: LoadingController
    ) { }
    ngOnInit() {
        //let id = this.activatedRoute.snapshot.paramMap.get("id");
        this.http.get(`http://localhost:5000/api/cities/`).subscribe(res => {
            this.usuarios = res;
        });
    }

    closeModal() {
        this.modalCtrl.dismiss();
    }
    createUser() {
        console.log("nombre: " + this.nombre);
        console.log("Apellidos: " + this.apellidos);
        console.log("cargo" + this.cargo);
        console.log("email: " + this.email);
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
            apellidos: this.apellidos,
            cargo: this.cargo,
            email: this.email
        };
        const body = new HttpParams()
            .set("nombre", this.nombre)
            .set("apellidos", this.apellidos)
            .set("cargo", this.cargo)
            .set("email", this.email);
        this.http.post("http://localhost:5000/api/users/", data).subscribe(
            val => {
                console.log("POST call successful value returned in body", val);
                this.present("Cargando lista de miembros ...");
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
            duration: 2000,
        }).then(a => {
            a.present().then(() => {
                console.log('presented');
                location.replace("/tabs/miembros-iglesia");
                if (this.isLoading) {
                    a.dismiss().then(() => console.log('abort presenting'));
                }
            });
        });
    }

    async dismiss() {
        this.isLoading = false;
        return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
    }

}
