import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { NgModel } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import {
    NavController,
    AlertController,
    ToastController,
    PopoverController
} from "@ionic/angular";

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
    cumpleanos: number;
    agradecimiento: number;
    otro: number;
    total: number;
    usuarios: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalCtrl: ModalController,
        private http: HttpClient,
        private router: Router,
        public alertCtrl: AlertController,
        private menuCtrl: MenuController
    ) {}

    ngOnInit() {
        this.http.get(`http://localhost:5000/api/users/`).subscribe(res => {
            this.usuarios = res;
            console.log(this.usuarios);
        });
    }

    async createRegistro() {
        console.log("iduser: " + this.iduser);
        console.log("diezmo: " + this.diezmo);
        console.log("ofrenda: " + this.ofrenda);
        console.log("primicias" + this.primicia);
        console.log("cumpleaños: " + this.cumpleanos);
        console.log("inversion: " + this.inversion);
        console.log("agradecimiento: " + this.agradecimiento);
        console.log("otro: " + this.otro);
        
        this.total = this.convertUndefined(this.diezmo) + this.convertUndefined(this.ofrenda) + this.convertUndefined(this.primicia) + this.convertUndefined(this.cumpleanos) +this.convertUndefined(this.inversion) + this.convertUndefined(this.agradecimiento) +this.convertUndefined(this.otro);
        
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
            primicias: this.primicia,
            cumpleanos: this.cumpleanos,
            inversion: this.inversion,
            agradecimiento: this.agradecimiento,
            otros: this.otro
        };
         
        //mensaje de confirmacion
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
                    text: "Aceptar y guardar",
                    handler: () => {
                        
                        this.agregarCont(data);
                       
                    }
                }
            ]
        });
        await alert.present();
        //fin de mensaje
        
    }
    agregarCont(data){
        this.http.post("http://localhost:5000/api/conteo/", data).subscribe(
            val => {
                console.log("POST call successful value returned in body", val);
                //this.router.navigateByUrl("/tabs-o/home-results");
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
    toggleMenu() {
        this.menuCtrl.toggle();
    }
}
