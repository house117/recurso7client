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
    primicias: number;
    inversion: number;
    cumpleanos: number;
    agradecimiento: number;
    otros: number;
    total: number;
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
        this.primicias = this.conteo.primicias;
        this.cumpleanos = this.conteo.cumpleanos;
        this.agradecimiento = this.conteo.agradecimiento;
        this.inversion = this.conteo.inversion;
        this.otros = this.conteo.otros;
        console.log("CONTEO: " + this.conteo.username);
    }
    async updateRegistro() {
        const headerDict = {
            "Content-Type": "application/json",
            Accept: "application/json"
        };
        this.total = this.convertUndefined(this.diezmo) + this.convertUndefined(this.ofrenda) + this.convertUndefined(this.primicias) + this.convertUndefined(this.cumpleanos) +this.convertUndefined(this.inversion) + this.convertUndefined(this.agradecimiento) +this.convertUndefined(this.otros);

        const requestOptions = {
            headers: new HttpHeaders(headerDict)
        };
        const data = {
            id: this.conteo._id,
            user: this.conteo.user,
            diezmo: this.diezmo,
            ofrenda: this.ofrenda,
            primicias: this.primicias,
            cumpleanos: this.cumpleanos,
            inversion: this.inversion,
            agradecimiento: this.agradecimiento,
            otros: this.otros
        };
        const alert = await this.alertCtrl.create({
            header: "Confirmación",
            message: "El monto total de este miembro es <strong>"+this.total+"</strong> pesos",
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
                    text: "Aceptar y actualizar",
                    handler: () => {
                        
                        this.updateCont(data);
                       
                    }
                }
            ]
        });
        await alert.present();
        //fin de mensaje
       
    }

    updateCont(data){
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

    convertUndefined(number){
        if(number==undefined){
            return 0;
        }else{
            return number;
        }
        
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
