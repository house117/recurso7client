import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MiembrosCreatePage } from './miembros-create.page';

const routes: Routes = [
  {
    path: '',
    component: MiembrosCreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MiembrosCreatePage]
})
export class MiembrosCreatePageModule {}
