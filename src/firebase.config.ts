// firebase.config.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { environment } from "./environment";

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);  // Solo si es necesario usar Analytics
const auth = getAuth(app);            // Inicializa Auth para autenticación
const storage = getStorage(app);      // Inicializa Storage para almacenamiento
