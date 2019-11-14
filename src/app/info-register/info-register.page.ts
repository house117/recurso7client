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
  selector: 'app-info-register',
  templateUrl: './info-register.page.html',
  styleUrls: ['./info-register.page.scss'],
})
export class InfoRegisterPage implements OnInit {
  conteo: any;
  url = "http://localhost:5000/api/conteo/";

  nombre: string;
  diezmo: number;
  ofrenda: number;
  primicia: number;
  inversion: number;
  cumpleanios: number;
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

    console.log("Usuario: " + this.conteo);
    this.nombre = this.conteo.nombre;
    this.diezmo = this.conteo.diezmo;
    this.ofrenda = this.conteo.ofrenda;
    this.primicia = this.conteo.primicia;
    this.cumpleanios = this.conteo.cumpleanios;
    this.agradecimiento = this.conteo.agradecimiento;
    this.inversion = this.conteo.inversion;
    this.otro = this.conteo.otro;
    this.http
      .get(`http://localhost:5000/api/users/${this.id}`)
      .subscribe(res => {
        this.conteo = res;
        this.nombre = this.conteo.nombre;
        this.diezmo = this.conteo.diezmo;
        this.ofrenda = this.conteo.ofrenda;
        this.primicia = this.conteo.primicia;
        this.cumpleanios = this.conteo.cumpleanios;
        this.agradecimiento = this.conteo.agradecimiento;
        this.inversion = this.conteo.inversion;
        this.otro = this.conteo.otro;
      });
  }
  updateUser() {
    console.log("nombre: " + this.nombre);
    const headerDict = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const data = {
      id: this.conteo._id,
      nombre: this.nombre,
      diezmo : this.conteo.diezmo,
      ofrenda : this.conteo.ofrenda,
      primicia : this.conteo.primicia,
      cumpleanios : this.conteo.cumpleanios,
      agradecimiento : this.conteo.agradecimiento,
      inversion : this.conteo.inversion,
      otro : this.conteo.otro
    };
    const body = new HttpParams()
      .set("id", this.conteo._id)
      .set("nombre", this.nombre)
      .set("diezmo", this.diezmo.toString())
      .set("ofrenda", this.ofrenda.toString())
      .set("primicia", this.primicia.toString())
      .set("cumpleanios", this.cumpleanios.toString())
      .set("inversion", this.inversion.toString())
      .set("agradecimiento", this.agradecimiento.toString())
      .set("otro", this.otro.toString());
    this.http.post("http://localhost:5000/api/users/", data).subscribe(
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
