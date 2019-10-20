import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-miembros-create',
  templateUrl: './miembros-create.page.html',
  styleUrls: ['./miembros-create.page.scss'],
})
export class MiembrosCreatePage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
