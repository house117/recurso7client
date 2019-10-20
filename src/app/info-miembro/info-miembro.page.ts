import { Component, OnInit } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController
} from "@ionic/angular";

@Component({
  selector: 'app-info-miembro',
  templateUrl: './info-miembro.page.html',
  styleUrls: ['./info-miembro.page.scss'],
})
export class InfoMiembroPage implements OnInit {

  constructor(public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController, public navCtrl: NavController ) { }

  ngOnInit() {
  }

  close() {
    this.navCtrl.navigateRoot('miembros-results');
  }
}
