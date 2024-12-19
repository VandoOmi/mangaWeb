import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore())
  ]
};

export const environment = {
  firebase: {
    apiKey: "AIzaSyCUs2tS3Hl_4pVKenyZsf-Ule9OeSf11y8",
    authDomain: "manga-web-f2da8.firebaseapp.com",
    projectId: "manga-web-f2da8",
    storageBucket: "manga-web-f2da8.firebasestorage.app",
    messagingSenderId: "25579161277",
    appId: "1:25579161277:web:9247fe5e0c62387ca659d4",
    measurementId: "G-FNVRS0WDXE"
  },
  production: false,
};