import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConteosCreatePage } from './conteos-create.page';

const routes: Routes = [
  {
    path: '',
    component: ConteosCreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConteosCreatePage]
})
export class ConteosCreatePageModule {}
