import { ActionSheetController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { IonList } from "@ionic/angular";
import { NgModel } from "@angular/forms";
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { IonInfiniteScroll } from "@ionic/angular";
import {
    NavController,
    AlertController,
    MenuController,
    ToastController,
    PopoverController,
    ModalController
} from "@ionic/angular";

@Component({
    selector: "app-home-results",
    templateUrl: "./home-results.page.html",
    styleUrls: ["./home-results.page.scss"]
})
export class HomeResultsPage implements OnInit {
    @ViewChild("lista") lista: IonList;
    conteo: any;
    usuarios: any;
    url = "http://localhost:5000/api/conteo/";

    constructor(
        private actionSheetCtrl: ActionSheetController,
        private menuCtrl: MenuController,
        private toastCtrl: ToastController,
        private http: HttpClient,
        public navCtrl: NavController,
        public popoverCtrl: PopoverController,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        //this.usuarios = this.getUsers();
        this.http.get(`http://localhost:5000/api/conteo/hoy`).subscribe(res => {
            this.conteo = res;
            console.log(this.conteo);
            var i: number;
            i = 0;
            var j: number;
            j = 0;

            this.http.get(`http://localhost:5000/api/users/`).subscribe(res => {
                this.usuarios = res;
                console.log(this.usuarios);

                for (i = 0; i < this.conteo.length; i++) {
                    if (this.conteo[i].diezmo) {
                        this.diezmo += parseFloat(this.conteo[i].diezmo);
                    }                   
                    if (this.conteo[i].ofrenda) {
                        this.ofrenda += parseFloat(this.conteo[i].ofrenda);
                    }
                    if (this.conteo[i].primicias) {
                        this.primicia += parseFloat(this.conteo[i].primicias);
                    }
                    if (this.conteo[i].inversion) {
                        this.inversion += parseFloat(this.conteo[i].inversion);
                    }
                   
                    if (this.conteo[i].cumpleanos) {
                        this.cumpleanos += parseFloat(
                            this.conteo[i].cumpleanos
                        );
                    }
                    if (this.conteo[i].agradecimiento) {
                        this.agradecimientos += parseFloat(
                            this.conteo[i].agradecimiento
                        );
                    }
                    if (this.conteo[i].otros) {
                        this.otros = parseFloat(this.conteo[i].otros);
                    }

                    console.log("ASDASDFASDFASDF");
                    for (j = 0; j < this.usuarios.length; j++) {
                        console.log("BBBBBBBBBBBBBBBBBBB");
                        console.log("CONTEO USER ID" + this.conteo[i].user);
                        console.log("USER ID " + this.usuarios[j]._id);
                        if (
                            this.conteo[i].user.toString() ==
                            this.usuarios[j]._id.toString()
                        ) {
                            console.log("MATCH!");
                            this.conteo[i].username =
                                this.usuarios[j].nombre.toString() +
                                " " +
                                this.usuarios[j].apellidos.toString();
                        }
                    }
                }
                this.total =
                    this.diezmo +
                    this.ofrenda +
                    this.primicia +
                    this.inversion +
                    this.cumpleanos +
                    this.agradecimientos +
                    this.otros;
            });
        });

        //var usuario = "";
    }
    async presentToast(message: string) {
        const toast = await this.toastCtrl.create({
            message,
            duration: 2000
        });
        toast.present();
    }

    favorite(conteo) {
        // console.log('favorite', user);
        this.presentToast("Guardó en favoritos");
        this.lista.closeSlidingItems();
    }

    /*share(conteo) {
        this.presentToast("Información!");
        this.lista.closeSlidingItems();
        this.info_register(conteo);
    }*/

    async borrar(conteo) {
        const alert = await this.alertCtrl.create({
            header: "Confirmación",
            message: "¿Deseas <stong>eliminar</strong> este registro?",
            buttons: [
                {
                    text: "Cancelar",
                    role: "cancel",
                    cssClass: "secondary",
                    handler: blah => {
                        console.log("Confirm Cancel: Cancelar");
                    }
                },
                {
                    text: "Eliminar",
                    handler: () => {
                        console.log("ENTRO A HANDLER");
                        this.deleteConteo(conteo);
                        this.presentToast("Borrado!");
                        this.lista.closeSlidingItems();
                    }
                }
            ]
        });
        await alert.present();
    }
    deleteConteo(conteo) {
        console.log("Función eliminar ...");
        this.http.delete(this.url + conteo._id).subscribe(
            val => {
                console.log(
                    "DELETE call successful value returned in body",
                    val
                );
                this.ngOnInit();
            },
            response => {
                console.log("DELETE call in error", response);
            },
            () => {
                console.log("The DELETE observable is now completed.");
                this.ngOnInit();
            }
        );
        this.ngOnInit();
        //location.replace(document.referrer);
    }
    toggleMenu() {
        this.menuCtrl.toggle();
    }
    info_register(conteo) {
        //this.navCtrl.navigateForward(InfoMiembro, { id: usuario._id });

        this.presentToast("Información del registro");
        this.lista.closeSlidingItems();
        let navigationExtras: NavigationExtras = {
            state: {
                conteo: conteo
            }
        };
        this.router.navigate(["info-register"], navigationExtras);
    }

    textoBuscar = "";
    buscar(event) {
        // console.log(event);
        this.textoBuscar = event.detail.value;
    }

    diezmo = 0.0;
    ofrenda = 0.0;
    primicia = 0.0;
    inversion = 0.0;
    cumpleanos = 0.0;
    agradecimientos = 0.0;
    otros = 0.0;
    total = 0.0;

    async presentActionSheet() {
        const actionSheet = await this.actionSheetCtrl.create({
            header: "Subtotales",
            backdropDismiss: false,
            buttons: [
                {
                    text: "Diezmo = $" + this.diezmo,
                    role: "destructive",
                    icon: "logo-usd",
                    handler: () => {
                        console.log("Diezmo subtotal");
                    }
                },
                {
                    text: "Ofrenda = $" + this.ofrenda,
                    icon: "logo-usd",
                    handler: () => {
                        console.log("Share clicked");
                    }
                },
                {
                    text: "Primicias = $" + this.primicia,
                    icon: "logo-usd",
                    handler: () => {
                        console.log("Play clicked");
                    }
                },
                {
                    text: "Inversion = $" + this.inversion,
                    icon: "logo-usd",
                    handler: () => {
                        console.log("Favorite clicked");
                    }
                },
                {
                    text: "Cumpleaños = $" + this.cumpleanos,
                    icon: "logo-usd",
                    handler: () => {
                        console.log("Play clicked");
                    }
                },
                {
                    text: "Agradecimientos = $" + this.agradecimientos,
                    icon: "logo-usd",
                    handler: () => {
                        console.log("Play clicked");
                    }
                },
                {
                    text: "Otros = $" + this.otros,
                    icon: "logo-usd",
                    handler: () => {
                        console.log("Play clicked");
                    }
                },
                {
                    text: "TOTAL = $" + this.total,
                    role: "destructive",
                    icon: "cash",
                    cssClass: "rojo",
                    handler: () => {
                        console.log("Play clicked");
                    }
                },
                {
                    text: "Cerrar",
                    icon: "close",
                    role: "cancel",
                    handler: () => {
                        this.ngOnInit(); 
                    }
                }
            ]
        });

        await actionSheet.present();
    }
}
