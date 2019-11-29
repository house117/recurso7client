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
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  @ViewChild('lista') lista: IonList;
  url = "http://localhost:5000/api/users/";

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  usuarios: any;
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

  ngOnInit() {
    //this.usuarios = this.getUsers();
    this.http.get(`http://localhost:5000/api/users/`).subscribe(res => {
      this.usuarios = res;
      console.log(this.usuarios);
    });
  }
  async borrar(user) {

    const alert = await this.alertCtrl.create({
      header: "Confirmación",
      message: "¿Deseas <stong>eliminar</strong> este registro favorito?",
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

  favorito: string;

  deleteUser(user) {
    console.log("Función eliminar favorito...");

    console.log("id: " + user._id);
    console.log("nombre: " + user.nombre);
    console.log("Apellidos: " + user.apellidos);
    console.log("cargo" + user.cargo);
    console.log("email: " + user.email);
    console.log("favorito: " + user.favorito);

    if (user.favorito == "VERDADERO") {
      this.favorito = "FALSO";
    } else if (user.favorito == "FALSO") {
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


      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");

      }
    );

  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }


}
