import { Component, OnInit } from "@angular/core";
import { MiembrosCreatePage } from "../../app/miembros-create/miembros-create.page";
import { NgModel } from "@angular/forms";
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import {
    NavController,
    AlertController,
    MenuController,
    ToastController,
    PopoverController,
    ModalController
} from "@ionic/angular";

@Component({
    selector: "app-miembros-results",
    templateUrl: "./miembros-results.page.html",
    styleUrls: ["./miembros-results.page.scss"]
})
export class MiembrosResultsPage implements OnInit {
    usuarios: any;
    url = "http://localhost:5000/api/users/";

    constructor(
        public navCtrl: NavController,
        public menuCtrl: MenuController,
        public popoverCtrl: PopoverController,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
        private router: Router
    ) {}

    ngOnInit() {
        //let id = this.activatedRoute.snapshot.paramMap.get("id");
        this.http.get(`http://localhost:5000/api/users/`).subscribe(res => {
            this.usuarios = res;
            console.log(this.usuarios);
        });
    }

    async miembrosCreate() {
        const modal = await this.modalCtrl.create({
            component: MiembrosCreatePage
        });
        return await modal.present();
    }
    miembros_info(usuario) {
        //this.navCtrl.navigateForward(InfoMiembro, { id: usuario._id });
        let navigationExtras: NavigationExtras = {
            state: {
                user: usuario
            }
        };
        this.router.navigate(["info-miembro"], navigationExtras);
    }
    async presentAlert(user) {
        const alert = await this.alertCtrl.create({
            header: "Confirmación",
            message: "¿Deseas <stong>eliminar</strong> este registro?",
            buttons: [
                {
                    text: "Cancelar",
                    role: "cancel",
                    cssClass: "secondary",
                    handler: blah => {
                        console.log("Confirm Cancel: blah");
                    }
                },
                {
                    text: "Eliminar",
                    handler: () => {
                        console.log("ENTRO A HANDLER");
                        this.deleteUser(user);
                    }
                }
            ]
        });

        await alert.present();
    }
    deleteUser(user) {
        console.log("ENTRO A ELIMIN");

        //console.log(this.url + this.city._id);
        //this.http.delete();
        this.http.delete(this.url + user._id).subscribe(
            val => {
                console.log(
                    "DELETE call successful value returned in body",
                    val
                );
            },
            response => {
                console.log("DELETE call in error", response);
            },
            () => {
                console.log("The DELETE observable is now completed.");
            }
        );
        location.replace(document.referrer);
    }
}
