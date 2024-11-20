import { Routes } from '@angular/router';
import { RadhiComponent } from './radhi/radhi.component';
import { SecondComponent } from './second/second.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { TerrainComponent } from './terrain/terrain.component';
import { AjoutComponent } from './ajout/ajout.component';
import { ProfileComponent } from './profile/profile.component';
import { ImmobilierComponent } from './immobilier/immobilier.component';
import { ProtestationComponent } from './protestation/protestation.component';
// Importez le composant Radhi

export const routes: Routes = [
    { path: 'radhi', component: RadhiComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'terrain', component: TerrainComponent },
    { path: 'ajout', component: AjoutComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'immobilier', component: ImmobilierComponent },
    { path: 'protestation', component: ProtestationComponent },
    // Ajoutez une route vers Radhi
    { path: '', redirectTo: '/radhi', pathMatch: 'full' },
    { path: 'second', component: SecondComponent },

    // Ajoutez une route vers Radhi
    // Redirection par défaut vers la page Radhi
];
