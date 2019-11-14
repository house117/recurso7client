import { ActionSheetController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IonList } from '@ionic/angular';
import { NgModel } from "@angular/forms";
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { IonInfiniteScroll } from '@ionic/angular';
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
export class HomeResultsPage implements OnInit{
   

  @ViewChild('lista') lista: IonList;
  conteo: any;
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
    this.http.get(`http://localhost:5000/api/conteo/`).subscribe(res => {
            this.conteo = res;
            console.log(this.conteo);
    });
  }
  async presentToast( message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }


  favorite( conteo ) {
    // console.log('favorite', user);
    this.presentToast('Guardó en favoritos');
    this.lista.closeSlidingItems();
  }


  share( conteo ) {
    this.presentToast('Información!');
    this.lista.closeSlidingItems();
    this.info_register(conteo);
  }

  async borrar( conteo ) {
    
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
                  this.presentToast('Borrado!');
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
        },
        response => {
            console.log("DELETE call in error", response);
        },
        () => {
            console.log("The DELETE observable is now completed.");
            this.http.get(`http://localhost:5000/api/conteo/`).subscribe(res => {
            this.conteo = res;
            console.log(this.conteo);
    });
          }
    );
    //location.replace(document.referrer);
    
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  } 
  info_register(conteo) {
    //this.navCtrl.navigateForward(InfoMiembro, { id: usuario._id });
    let navigationExtras: NavigationExtras = {
        state: {
            conteo: conteo
        }
    };
    this.router.navigate(["info-register"], navigationExtras);
  }

  textoBuscar = "";
  buscar( event ) {
    // console.log(event);
    this.textoBuscar = event.detail.value;
  }

   diezmo = 123.67;
   ofrenda = 23.50;
   primicia = 12.00;
   inversion = 0.00;
   cumpleaños = 0.00;
   agradecimientos = 34.50;
   otros = 0.00;
   total = this.diezmo + this.ofrenda + this.primicia + this.inversion + this.cumpleaños + this.agradecimientos + this.otros;

    
    async presentActionSheet() {
        const actionSheet = await this.actionSheetCtrl.create({
          header: 'Subtotales',
          backdropDismiss: false,
          buttons: [{
            text: 'Diezmo = $'+ this.diezmo,
            role: 'destructive',
            icon: 'logo-usd',
            handler: () => {
              console.log('Diezmo subtotal');
            }
          }, {
            text: 'Ofrenda = $'+this.ofrenda,
            icon: 'logo-usd',
            handler: () => {
              console.log('Share clicked');
            }
          }, {
            text: 'Primicias = $'+this.primicia,
            icon: 'logo-usd',
            handler: () => {
              console.log('Play clicked');
            }
          }, {
            text: 'Inversion = $'+this.inversion,
            icon: 'logo-usd',
            handler: () => {
              console.log('Favorite clicked');
            }
          },{
            text: 'Cumpleaños = $'+this.cumpleaños,
            icon: 'logo-usd',
            handler: () => {
              console.log('Play clicked');
            }
          },{
            text: 'Agradecimientos = $'+this.agradecimientos,
            icon: 'logo-usd',
            handler: () => {
              console.log('Play clicked');
            }
          },{
            text: 'Otros = $'+this.otros,
            icon: 'logo-usd',
            handler: () => {
              console.log('Play clicked');
            }
          },{
            text: 'TOTAL = $'+this.total,
            role: 'destructive',
            icon: 'cash',
            cssClass: 'rojo',
            handler: () => {
              console.log('Play clicked');
            }
          },{
            text: 'Cerrar',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
        });
    
        await actionSheet.present();
    }

    
    


}
