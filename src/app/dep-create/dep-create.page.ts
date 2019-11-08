import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-dep-create',
  templateUrl: './dep-create.page.html',
  styleUrls: ['./dep-create.page.scss'],
})
export class DepCreatePage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
