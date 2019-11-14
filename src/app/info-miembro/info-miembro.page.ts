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
    selector: "app-info-miembro",
    templateUrl: "./info-miembro.page.html",
    styleUrls: ["./info-miembro.page.scss"]
})
export class InfoMiembroPage implements OnInit {
    usuario: any;
    url = "http://localhost:5000/api/users/";

    nombre: string;
    apellidos: string;
    cargo: string;
    email: string;
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
                this.usuario = this.router.getCurrentNavigation().extras.state.user;
            }
        });
    }

    ngOnInit() {
        //let id = this.activatedRoute.snapshot.paramMap.get("special");

        console.log("Usuario: " + this.usuario);
        this.nombre = this.usuario.nombre;
        this.apellidos = this.usuario.apellidos;
        this.cargo = this.usuario.cargo;
        this.email = this.usuario.email;
        this.http
            .get(`http://localhost:5000/api/users/${this.id}`)
            .subscribe(res => {
                this.usuario = res;
                this.nombre = this.usuario.nombre;
                this.apellidos = this.usuario.apellidos;
                this.cargo = this.usuario.cargo;
                this.email = this.usuario.email;
            });
    }
    updateUser() {
        console.log("nombre: " + this.nombre);
        console.log("Apellidos: " + this.apellidos);
        console.log("cargo" + this.cargo);
        console.log("email: " + this.email);
        const headerDict = {
            "Content-Type": "application/json",
            Accept: "application/json"
        };

        const requestOptions = {
            headers: new HttpHeaders(headerDict)
        };
        const data = {
            id: this.usuario._id,
            nombre: this.nombre,
            apellidos: this.apellidos,
            cargo: this.cargo,
            email: this.email
        };
        const body = new HttpParams()
            .set("id", this.usuario._id)
            .set("nombre", this.nombre)
            .set("apellidos", this.apellidos)
            .set("cargo", this.cargo)
            .set("email", this.email);
        this.http.post("http://localhost:5000/api/users/", data).subscribe(
            val => {
                console.log("POST call successful value returned in body", val);
                location.replace("/tabs/miembros-iglesia");
            },
            response => {
                console.log("POST call in error", response);
            },
            () => {
                console.log("The POST observable is now completed.");
            }
        );
    }
    close() {
        this.navCtrl.navigateRoot("miembros-results");
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
