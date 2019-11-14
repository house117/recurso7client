import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  ocultar = '';

  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/img/finanzas.png',
      titulo: 'Administra',
      desc: 'Administra los diezmos y ofrendas de tu iglesia'
    },
    {
      img: '/assets/img/f.png',
      titulo: 'Conteo semanal',
      desc: 'Haz el conteo de las ofrendas en tiempo real'
    },
    {
      img: '/assets/img/finanzas03.png',
      titulo: 'Agrega miembros',
      desc: 'Agrega miembros de iglesia para administrarlos'
    },
    {
      img: '/assets/img/finanzas04.png',
      titulo: 'Interfaz amigable',
      desc: 'Sistema intuitivo y fácil de usar!'
    }
  ];

  constructor( private navCtrl: NavController ) { }

  ngOnInit() {
  }

  onClick() {

    this.ocultar = 'animated fadeOut fast';
    this.navCtrl.navigateBack('/ingreso');

  }


}
