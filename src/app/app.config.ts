// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Importez les routes définies dans app.routes.ts
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  // Active la détection de changement avec coalescence d'événements
    provideRouter(routes),  // Fournit les routes à l'application
    provideClientHydration(),
    HttpClientModule,
    FormsModule, provideFirebaseApp(() => initializeApp({ project param })), provideFirestore(() => getFirestore()),  // Fournit l'hydratation côté client pour améliorer les performances
  ]
};
