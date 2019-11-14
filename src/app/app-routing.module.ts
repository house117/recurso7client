import { NgModule } from "@angular/core";
import { PreloadAllModules, Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    { path: "", loadChildren: "./inicio/inicio.module#InicioPageModule" },
    {
        path: "register",
        loadChildren: "./pages/register/register.module#RegisterPageModule"
    },
    {
        path: "about",
        loadChildren: "./pages/about/about.module#AboutPageModule"
    },
    {
        path: "settings",
        loadChildren: "./pages/settings/settings.module#SettingsPageModule"
    },
    {
        path: "edit-profile",
        loadChildren:
            "./pages/edit-profile/edit-profile.module#EditProfilePageModule"
    },
    {
        path: "home-results",
        loadChildren:
            "./pages/home-results/home-results.module#HomeResultsPageModule"
    },
    {
        path: "delete-register",
        loadChildren:
            "./delete-register/delete-register.module#DeleteRegisterPageModule"
    },
    {
        path: "info-register",
        loadChildren:
            "./info-register/info-register.module#InfoRegisterPageModule"
    },
    {
        path: "miembros-results",
        loadChildren:
            "./miembros-results/miembros-results.module#MiembrosResultsPageModule"
    },
    {
        path: "miembros-create",
        loadChildren:
            "./miembros-create/miembros-create.module#MiembrosCreatePageModule"
    },
    {
        path: "info-miembro",
        loadChildren: "./info-miembro/info-miembro.module#InfoMiembroPageModule"
    },
    {
        path: "dep-results",
        loadChildren: "./dep-results/dep-results.module#DepResultsPageModule"
    },
    {
        path: "dep-create",
        loadChildren: "./dep-create/dep-create.module#DepCreatePageModule"
    },
    {
        path: "info-dep",
        loadChildren: "./info-dep/info-dep.module#InfoDepPageModule"
    },
    {
        path: "dep-mov",
        loadChildren: "./dep-mov/dep-mov.module#DepMovPageModule"
    },
  { path: 'inicio', loadChildren: './inicio/inicio.module#InicioPageModule' },  { path: 'ingreso', loadChildren: './ingreso/ingreso.module#IngresoPageModule' },
  { path: 'miembros-iglesia', loadChildren: './miembros-iglesia/miembros-iglesia.module#MiembrosIglesiaPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tabs-o', loadChildren: './tabs-o/tabs-o.module#TabsOPageModule' },
  { path: 'conteos-create', loadChildren: './conteos-create/conteos-create.module#ConteosCreatePageModule' }


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
