import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IonList, ToastController } from '@ionic/angular';
import { MiembrosCreatePage } from "../../app/miembros-create/miembros-create.page";
import { NgModel } from "@angular/forms";
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { IonInfiniteScroll } from '@ionic/angular';
import { HttpHeaders } from "@angular/common/http";
import {
  NavController,
  AlertController,
  PopoverController,
  ModalController
} from "@ionic/angular";

@Component({
  selector: 'app-miembros-iglesia',
  templateUrl: './miembros-iglesia.page.html',
  styleUrls: ['./miembros-iglesia.page.scss'],
})
export class MiembrosIglesiaPage implements OnInit {
  //Para el scrooll infinito
  @ViewChild(IonInfiniteScroll) infitniteScroll: IonInfiniteScroll;
  data: any[] = Array(3);

  @ViewChild('lista') lista: IonList;
  //usuarios: Observable<any>;

  usuarios: any;
  url = "http://localhost:5000/api/users/";

  constructor(private menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private http: HttpClient,
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  always : string;
  ngOnInit() {
    //this.usuarios = this.getUsers();
    this.http.get(`http://localhost:5000/api/users/`).subscribe(res => {
      this.usuarios = res;
      console.log(this.usuarios);
    });
    //this.status = "FALSO";
    this.always = "VERDADERO";
  }






  //getUsers() {
  //  return this.http.get('https://jsonplaceholder.typicode.com/users');
  //}

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }


  favorito: string;

  favorite(user) {
    
    

    //funcion agregar a favoritos
    
    console.log("id: " + user._id);
    console.log("nombre: " + user.nombre);
    console.log("Apellidos: " + user.apellidos);
    console.log("cargo" + user.cargo);
    console.log("email: " + user.email);
    console.log("favorito: " + user.favorito);
    
    if(user.favorito == "VERDADERO"){
      this.favorito = "FALSO";
    }else if(user.favorito == "FALSO"){
      this.favorito = "VERDADERO";
    }

    const headerDict = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const data = {
      id: user._id,
      favorito: this.favorito
    };
    const body = new HttpParams()
      .set("id", user._id)
      .set("favorito", this.favorito);
      
    this.http.post("http://localhost:5000/api/users/", data).subscribe(
      val => {
        console.log("POST call successful value returned in body", val);
        this.presentToast('Guardó en favoritos');
        this.lista.closeSlidingItems();

      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
        this.presentToast('Guardó en favoritos');
        this.lista.closeSlidingItems();
      }
    );
  }

  share(user) {
    this.presentToast('Información!');
    this.lista.closeSlidingItems();
    this.miembros_info(user);
  }

  async borrar(user) {

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
            this.deleteUser(user);
            this.presentToast('Borrado!');
            this.lista.closeSlidingItems();
          }
        }
      ]
    });
    await alert.present();
  }

  deleteUser(user) {
    console.log("Función eliminar ...");
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
        this.http.get(`http://localhost:5000/api/users/`).subscribe(res => {
          this.usuarios = res;
          console.log(this.usuarios);
        });
      }
    );
    //location.replace(document.referrer);

  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  miembros_info(usuario) {
    this.presentToast('Información del miembro!');
    this.lista.closeSlidingItems();
    //this.navCtrl.navigateForward(InfoMiembro, { id: usuario._id });
    let navigationExtras: NavigationExtras = {
      state: {
        user: usuario
      }
    };
    this.router.navigate(["info-miembro"], navigationExtras);
  }

  textoBuscar = "";
  buscar(event) {
    // console.log(event);
    this.textoBuscar = event.detail.value;
  }
}
