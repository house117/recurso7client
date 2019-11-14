import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
  ocultar = '';
  nombre: string;

  usuario = {
    usuario: '',
    contrasena: ''
  };

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  onSubmitTemplate() {
    console.log('Form submit');
    console.log( this.usuario );
  }

  goMiembros() {

    this.ocultar = 'animated fadeOut fast';
    this.navCtrl.navigateBack('/tabs/miembros-iglesia');

  }

}
