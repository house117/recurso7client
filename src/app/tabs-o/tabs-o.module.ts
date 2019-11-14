import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsOPage } from './tabs-o.page';
  
const routes: Routes = [
  {
    path: '',
    component: TabsOPage,
    children: [
      {
        path: 'home-results',
        loadChildren: '../pages/home-results/home-results.module#HomeResultsPageModule'
      },
      {
        path: 'conteos-create',
        loadChildren: '../conteos-create/conteos-create.module#ConteosCreatePageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsOPage]
})
export class TabsOPageModule {}
