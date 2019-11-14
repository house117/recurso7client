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

  ngOnInit() {
    //this.usuarios = this.getUsers();
    this.http.get(`http://localhost:5000/api/users/`).subscribe(res => {
            this.usuarios = res;
            console.log(this.usuarios);
    });
  }

  
  

 
  
  //getUsers() {
  //  return this.http.get('https://jsonplaceholder.typicode.com/users');
  //}

  async presentToast( message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }


  favorite( user ) {
    // console.log('favorite', user);
    this.presentToast('Guardó en favoritos');
    this.lista.closeSlidingItems();
  }

  share( user ) {
    this.presentToast('Información!');
    this.lista.closeSlidingItems();
    this.miembros_info(user);
  }

  async borrar( user ) {
    
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
    //this.navCtrl.navigateForward(InfoMiembro, { id: usuario._id });
    let navigationExtras: NavigationExtras = {
        state: {
            user: usuario
        }
    };
    this.router.navigate(["info-miembro"], navigationExtras);
  }

  textoBuscar = "";
  buscar( event ) {
    // console.log(event);
    this.textoBuscar = event.detail.value;
  }
}
