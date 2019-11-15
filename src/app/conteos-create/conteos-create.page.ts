import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { NgModel } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
    selector: "app-conteos-create",
    templateUrl: "./conteos-create.page.html",
    styleUrls: ["./conteos-create.page.scss"]
})
export class ConteosCreatePage implements OnInit {
    iduser: string;
    diezmo: number;
    ofrenda: number;
    primicia: number;
    inversion: number;
    cumpleanios: number;
    agradecimiento: number;
    otro: number;
    usuarios: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalCtrl: ModalController,
        private http: HttpClient,
        private router: Router,
        private menuCtrl: MenuController
    ) {}

    ngOnInit() {
        this.http.get(`http://localhost:5000/api/users/`).subscribe(res => {
            this.usuarios = res;
            console.log(this.usuarios);
        });
    }

    createRegistro() {
        console.log("iduser: " + this.iduser);
        console.log("diezmo: " + this.diezmo);
        console.log("ofrenda: " + this.ofrenda);
        console.log("primicias" + this.primicia);
        console.log("cumpleaños: " + this.cumpleanios);
        console.log("inversion: " + this.inversion);
        console.log("agradecimiento: " + this.agradecimiento);
        console.log("otro: " + this.otro);

        const headerDict = {
            "Content-Type": "application/json",
            Accept: "application/json"
        };

        const requestOptions = {
            headers: new HttpHeaders(headerDict)
        };
        const data = {
            user: this.iduser,
            diezmo: this.diezmo,
            ofrenda: this.ofrenda,
            primicia: this.primicia,
            cumpleanios: this.cumpleanios,
            inversion: this.inversion,
            agradecimiento: this.agradecimiento,
            otro: this.otro
        };
        /*const body = new HttpParams()
            .set("diezmo", this.diezmo.toString())
            .set("ofrenda", this.ofrenda.toString())
            .set("primicia", this.primicia.toString())
            .set("cumpleanios", this.cumpleanios.toString())
            .set("inversion", this.inversion.toString())
            .set("agradecimiento", this.agradecimiento.toString())
            .set("otro", this.otro.toString());*/
        this.http.post("http://localhost:5000/api/conteo/", data).subscribe(
            val => {
                console.log("POST call successful value returned in body", val);
                location.replace("/tabs-o/home-results");
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
