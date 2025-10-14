import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { IniciarSesionComponent } from './view/iniciar-sesion/iniciar-sesion.component';
import { PrincipalComponent } from './view/principal/principal.component';
import { RegistrateComponent } from './view/registrate/registrate.component';

export const routes: Routes = [
    {
        path: 'iniciar_sesion',
        component: IniciarSesionComponent,
    },
    {
        path: '',
        component: PrincipalComponent,
        canActivate: [authGuard],
    },
    {
        path: 'registrate',
        component: RegistrateComponent,
    },
];
