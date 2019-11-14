import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { PopmenuComponent } from "./../../components/popmenu/popmenu.component";

import { HomeResultsPage } from "./home-results.page";
import { PipesModule } from '../../pipes/pipes.module';

const routes: Routes = [
    {
        path: "",
        component: HomeResultsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PipesModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HomeResultsPage, PopmenuComponent]
})
export class HomeResultsPageModule {}
