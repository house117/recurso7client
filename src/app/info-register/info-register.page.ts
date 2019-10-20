import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-info-register',
  templateUrl: './info-register.page.html',
  styleUrls: ['./info-register.page.scss'],
})
export class InfoRegisterPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  close_principal(){
    this.navCtrl.navigateRoot('/home-results');
  }
  
  
}
