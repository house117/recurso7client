import { Component } from "@angular/core";

import { Platform, NavController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { Pages } from "./interfaces/pages";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    public appPages: Array<Pages>;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public navCtrl: NavController
    ) {
        this.appPages = [
            {
                title: "Diezmos y ofrendas",
                url: "/home-results",
                direct: "root",
                icon: "logo-usd"
            },
            {
                title: "Miembros de iglesia",
                url: "/miembros-results",
                direct: "forward",
                icon: "md-people"
            },

            {
                title: "Departamentos",
                url: "/dep-results",
                direct: "forward",
                icon: "md-analytics"
            }
        ];

        this.initializeApp();
    }

    initializeApp() {
        this.platform
            .ready()
            .then(() => {
                this.statusBar.styleDefault();
                this.splashScreen.hide();
            })
            .catch(() => {});
    }

    goToEditProgile() {
        this.navCtrl.navigateForward("edit-profile");
    }

    logout() {
        this.navCtrl.navigateRoot("/");
    }
}
