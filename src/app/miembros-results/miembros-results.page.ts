import { Component, OnInit } from '@angular/core';
import { MiembrosCreatePage } from "../../app/miembros-create/miembros-create.page";
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController
} from "@ionic/angular";

@Component({
  selector: 'app-miembros-results',
  templateUrl: './miembros-results.page.html',
  styleUrls: ['./miembros-results.page.scss'],
})
export class MiembrosResultsPage implements OnInit {

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async miembrosCreate() {
    const modal = await this.modalCtrl.create({
      component: MiembrosCreatePage
    });
    return await modal.present();
  }
  miembros_info() {
    this.navCtrl.navigateRoot('/info-miembro');
  }
  presentAlert() {
    const alert = this.alertCtrl.create({
      message: '¿Seguro de eliminar este registro?',
      subHeader: 'Eliminar Registro',
      buttons: ['Eliminar', 'Cancelar']
    }).then(alert => alert.present());
  }
}
