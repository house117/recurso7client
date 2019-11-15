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
    selector: "app-info-register",
    templateUrl: "./info-register.page.html",
    styleUrls: ["./info-register.page.scss"]
})
export class InfoRegisterPage implements OnInit {
    conteo: any;
    url = "http://localhost:5000/api/conteo/";
    usuarios: any;
    nombre: string;
    diezmo: number;
    ofrenda: number;
    primicia: number;
    inversion: number;
    cumpleanos: number;
    agradecimiento: number;
    otro: number;
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
                this.conteo = this.router.getCurrentNavigation().extras.state.conteo;
            }
        });
    }

    ngOnInit() {
        //let id = this.activatedRoute.snapshot.paramMap.get("special");
        this.http.get(`http://localhost:5000/api/users/`).subscribe(res => {
            this.usuarios = res;
            console.log(this.usuarios);
        });
        //this.nombre = this.conteo.nombre;
        this.diezmo = this.conteo.diezmo;
        this.ofrenda = this.conteo.ofrenda;
        this.primicia = this.conteo.primicia;
        this.cumpleanos = this.conteo.cumpleanos;
        this.agradecimiento = this.conteo.agradecimiento;
        this.inversion = this.conteo.inversion;
        this.otro = this.conteo.otro;
        console.log("CONTEO: " + this.conteo.username);
    }
    updateRegistro() {
        const headerDict = {
            "Content-Type": "application/json",
            Accept: "application/json"
        };

        const requestOptions = {
            headers: new HttpHeaders(headerDict)
        };
        const data = {
            id: this.conteo._id,
            user: this.conteo.user,
            diezmo: this.diezmo,
            ofrenda: this.ofrenda,
            primicia: this.primicia,
            cumpleanos: this.cumpleanos,
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
