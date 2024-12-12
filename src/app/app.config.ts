import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { MangaService } from '../services/manga.service';

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
    }]
  
};
