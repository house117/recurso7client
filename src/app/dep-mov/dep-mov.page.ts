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
    selector: "app-dep-mov",
    templateUrl: "./dep-mov.page.html",
    styleUrls: ["./dep-mov.page.scss"]
})
export class DepMovPage implements OnInit {
    deps: any;
    url = "http://localhost:5000/api/movimientos/";

    _id: string;
    tipo: string;
    cantidad: string;
    motivo: string;
    id: any;
    movs: any;
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
        /*
    console.log("Departamento: " + this.deps);
    this.tipo = this.deps.tipo;
    this.cantidad = this.deps.cantidad;
    this.motivo = this.deps.motivo;
    */
        this.http
            .get(`http://localhost:5000/api/movimientos/${this.deps._id}`)
            .subscribe(res => {
                this.movs = res;
                /*
            this._id = this.deps._id,
            this.tipo = this.deps.tipo;
            this.cantidad = this.deps.cantidad;
            this.motivo = this.deps.motivo;
            */
            });
    }
    createMov() {
        console.log("tipo: " + this.tipo);
        console.log("cantidad: " + this.cantidad);
        console.log("motivo" + this.motivo);

        const headerDict = {
            "Content-Type": "application/json",
            Accept: "application/json"
        };

        const requestOptions = {
            headers: new HttpHeaders(headerDict)
        };
        const data = {
            id: this.deps._id,
            tipo: this.tipo,
            cantidad: this.cantidad,
            motivo: this.motivo
        };
        const body = new HttpParams()
            .set("id", this.deps._id)
            .set("tipo", this.tipo)
            .set("cantidad", this.cantidad)
            .set("motivo", this.motivo);
        this.http
            .post("http://localhost:5000/api/movimientos/", data)
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
                message: "Movimiento realizado",
                subHeader: "Bien hecho",
                buttons: ["Aceptar"]
            })
            .then(alert => alert.present());
    }

    async borrar(mov) {
        const alert = await this.alertCtrl.create({
            header: "Confirmación",
            message: "¿Deseas <stong>eliminar</strong> este movimiento?",
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
                        this.deleteMov(mov);
                    }
                }
            ]
        });
        await alert.present();
    }

    deleteMov(mov) {
        console.log("Función eliminar ...");
        this.http.delete(this.url + mov._id).subscribe(
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
                this.http
                    .get(`http://localhost:5000/api/movimientos/`)
                    .subscribe(res => {
                        this.movs = res;
                        console.log(this.movs);
                    });
            }
        );
        //location.replace(document.referrer);
    }
}
