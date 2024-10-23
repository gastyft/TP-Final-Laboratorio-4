import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({
      projectId: "persistencia-videos",
      appId: "1:560858142847:web:b2bd1a58d872686e04c74a",
      storageBucket: "persistencia-videos.appspot.com",
      apiKey: "AIzaSyDcZuYTRyqXy1kvwfHy1DcamtZCTspFoPg",
      authDomain: "persistencia-videos.firebaseapp.com",
      messagingSenderId: "560858142847",
      measurementId: "G-R8QBV78CCW"
    })),
    provideStorage(() => getStorage()), provideFirebaseApp(() => initializeApp({"projectId":"persistencia-videos","appId":"1:560858142847:web:b2bd1a58d872686e04c74a","storageBucket":"persistencia-videos.appspot.com","apiKey":"AIzaSyDcZuYTRyqXy1kvwfHy1DcamtZCTspFoPg","authDomain":"persistencia-videos.firebaseapp.com","messagingSenderId":"560858142847","measurementId":"G-R8QBV78CCW"})), provideAuth(() => getAuth())
  ]
};
