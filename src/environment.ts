// src/environments/environment.ts
import { initializeApp } from "firebase/app";

// Configuración de Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyDcZuYTRyqXy1kvwfHy1DcamtZCTspFoPg",
  authDomain: "persistencia-videos.firebaseapp.com",
  projectId: "persistencia-videos",
  storageBucket: "persistencia-videos.appspot.com",
  messagingSenderId: "560858142847",
  appId: "1:560858142847:web:b2bd1a58d872686e04c74a",
  measurementId: "G-R8QBV78CCW"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);

// Exportar el entorno
export const environment = {
  production: true,
  firebaseConfig
};
