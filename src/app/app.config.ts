import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { MangaService } from '../services/manga.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    MangaService,
    {
      provide: APP_INITIALIZER,
      useFactory: (mangaService: MangaService) => () => mangaService.init(),
      deps: [MangaService],
      multi: true
    }, 
    provideFirebaseApp(() => initializeApp({"projectId":"manga-idk","appId":"1:262611467870:web:3a84284916cfd841297ecf","storageBucket":"manga-idk.firebasestorage.app","apiKey":"AIzaSyAyXXxdr_vJUqK9vugv0jSMXXPeJy2_izk","authDomain":"manga-idk.firebaseapp.com","messagingSenderId":"262611467870"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
  
};
