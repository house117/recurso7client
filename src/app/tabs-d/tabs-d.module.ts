import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsDPage } from './tabs-d.page';

const routes: Routes = [
  {
    path: '',
    component: TabsDPage,
    children: [
      {
        path: 'dep-results',
        loadChildren: '../dep-results/dep-results.module#DepResultsPageModule'
      },
      {
        path: 'dep-create',
        loadChildren: '../dep-create/dep-create.module#DepCreatePageModule'
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
  declarations: [TabsDPage]
})
export class TabsDPageModule {}
