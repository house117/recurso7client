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
  selector: 'app-info-dep',
  templateUrl: './info-dep.page.html',
  styleUrls: ['./info-dep.page.scss'],
})


export class InfoDepPage implements OnInit {

  constructor(public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController, public navCtrl: NavController) { }

  ngOnInit() {
  }

  close() {
    this.navCtrl.navigateRoot('dep-results');
  }
}
