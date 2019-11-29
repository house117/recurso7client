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
  selector: 'app-dep-results',
  templateUrl: './dep-results.page.html',
  styleUrls: ['./dep-results.page.scss'],
})
export class DepResultsPage implements OnInit {

  @ViewChild('lista') lista: IonList;
  deps: any;
  url = "http://localhost:5000/api/departamentos/";

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
  sumaPor = 0;
  ngOnInit() { 
    //this.usuarios = this.getUsers();
    this.http.get(`http://localhost:5000/api/departamentos/`).subscribe(res => {
            this.deps = res;
            for (var i = 0; i < this.deps.length; i++) {
              console.log(this.deps[i].porcentaje);
              this.sumaPor += parseFloat(this.deps[i].porcentaje);
              console.log(this.sumaPor);
            }
            
    });
    
  }

  
  

 
  


  async presentToast( message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }


  movimiento( dep ) {
    this.presentToast('Movimientos!');
    this.lista.closeSlidingItems();
    this.dep_mov(dep);
  }

  

  async borrar( dep ) {
    
    const alert = await this.alertCtrl.create({
      header: "Confirmación",
      message: "¿Deseas <stong>eliminar</strong> este departamento?",
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
                  this.deleteDep(dep);
                  this.presentToast('Borrado!');
                  this.lista.closeSlidingItems();
              }
          }
      ]
    });
    await alert.present();
  }

  deleteDep(dep) {
    console.log("Función eliminar ...");
    this.http.delete(this.url + dep._id).subscribe(
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
            this.http.get(`http://localhost:5000/api/departamentos/`).subscribe(res => {
              this.deps = res;
              
              
      });
          }
    );
    //location.replace(document.referrer);
    
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  } 

  dep_info(dep) {
    this.presentToast('Información y actualización!');
    this.lista.closeSlidingItems();
    let navigationExtras: NavigationExtras = {
        state: {
            dep: dep
        }
    };
    this.router.navigate(["info-dep"], navigationExtras);
  }
 
  dep_mov(dep) {
    //this.navCtrl.navigateForward(InfoMiembro, { id: usuario._id });
    let navigationExtras: NavigationExtras = {
        state: {
            dep: dep
        }
    };
    this.router.navigate(["dep-mov"], navigationExtras);
  }
  textoBuscar = "";
  buscar( event ) {
    // console.log(event);
    this.textoBuscar = event.detail.value;
  }
  
}
