import { Component, OnInit } from '@angular/core';
import { DepCreatePage } from "../../app/dep-create/dep-create.page";

import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController
} from "@ionic/angular";
@Component({
  selector: 'app-dep-results',
  templateUrl: './dep-results.page.html',
  styleUrls: ['./dep-results.page.scss'],
})
export class DepResultsPage implements OnInit {

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async DepCreate() {
    const modal = await this.modalCtrl.create({
      component: DepCreatePage
    });
    return await modal.present();
  }
  dep_info() {
    this.navCtrl.navigateRoot('/info-dep');
  }
  mov_info() {
    this.navCtrl.navigateRoot('/dep-mov');
  }
  presentAlert() {
    const alert = this.alertCtrl.create({
      message: '¿Seguro de eliminar este registro?',
      subHeader: 'Eliminar Registro',
      buttons: ['Eliminar', 'Cancelar']
    }).then(alert => alert.present());
  }
}
