import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import {
    NavController,
    AlertController,
    MenuController,
    ToastController,
    PopoverController,
    ModalController
} from "@ionic/angular";

@Component({
    selector: "app-info-dep",
    templateUrl: "./info-dep.page.html",
    styleUrls: ["./info-dep.page.scss"]
})
export class InfoDepPage implements OnInit {
    deps: any;
    url = "http://localhost:5000/api/departamentos/";

    _id: string;
    nombre: string;
    porcentaje: string;
    saldo: string;
    id: any;
    constructor(
        public menuCtrl: MenuController,
        public popoverCtrl: PopoverController,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public navCtrl: NavController,
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        private location: Location
    ) {
        this.activatedRoute.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.deps = this.router.getCurrentNavigation().extras.state.dep;
            }
        });
    }

    ngOnInit() {
        //let id = this.activatedRoute.snapshot.paramMap.get("special");

        console.log("Departamento: " + this.deps);
        this.nombre = this.deps.nombre;
        this.porcentaje = this.deps.porcentaje;
        this.saldo = this.deps.saldo;

        this.http
            .get(`http://localhost:5000/api/departamentos/${this.deps._id}`)
            .subscribe(res => {
                (this.deps = res),
                    (this._id = this.deps._id),
                    (this.nombre = this.deps.nombre);
                this.porcentaje = this.deps.apellidos;
                this.saldo = this.deps.cargo;
            });
    }
    updateDep() {
        console.log("nombre: " + this.nombre);
        console.log("porcentaje: " + this.porcentaje);
        console.log("saldo" + this.saldo);

        const headerDict = {
            "Content-Type": "application/json",
            Accept: "application/json"
        };

        const requestOptions = {
            headers: new HttpHeaders(headerDict)
        };
        const data = {
            id: this.deps._id,
            nombre: this.nombre,
            porcentaje: this.porcentaje,
            saldo: this.saldo
        };
        const body = new HttpParams()
            .set("id", this.deps._id)
            .set("porcentaje", this.nombre)
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

    alertaUpdate() {
        const alert = this.alertCtrl
            .create({
                message: "Usuario Modificado",
                subHeader: "Bien hecho",
                buttons: ["Aceptar"]
            })
            .then(alert => alert.present());
    }
}
