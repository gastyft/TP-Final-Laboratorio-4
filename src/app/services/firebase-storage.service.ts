import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { environment } from '../../environment'; // Ajusta la ruta según sea necesario
import { initializeApp } from 'firebase/app';
import { Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: any;
  auth: Auth;

  constructor() {
    // Inicializar Firebase
    const app = initializeApp(environment.firebase);
    this.storage = getStorage(app);
    this.auth = getAuth(app); // Inicializar Auth
  }

  // Método para iniciar sesión
  signIn(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => console.log('Usuario autenticado'))
      .catch((error) => {
        console.error('Error al autenticar usuario:', error);
        throw new Error('Error de autenticación: ' + error.message);
      });
  }

  // Método para subir archivos
  uploadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          // Usuario autenticado, puedes subir el archivo
          const fileRef = ref(this.storage, `uploads/${file.name}`);
          uploadBytes(fileRef, file)
            .then(() => getDownloadURL(fileRef))
            .then((url) => {
              console.log('Archivo subido, URL:', url);
              resolve(url); // Devolver la URL del archivo
            })
            .catch((error: any) => {
              console.error('Error al subir el archivo:', error);
              reject(new Error('Error al subir el archivo: ' + error.message));
            });
        } else {
          console.error('El usuario no está autenticado.');
          reject(new Error('El usuario no está autenticado.'));
        }
      });
    });
  }

  // Método para listar archivos
  listFiles(): Promise<string[]> {
    const listRef = ref(this.storage, 'uploads/');
    return listAll(listRef)
      .then((res) => {
        const fileUrls: string[] = [];
        const urlPromises = res.items.map((item) => {
          return getDownloadURL(item).then((url) => {
            fileUrls.push(url);
          });
        });
        return Promise.all(urlPromises).then(() => fileUrls);
      })
      .catch((error) => {
        console.error('Error al listar archivos', error);
        throw new Error('Error al listar archivos: ' + error.message);
      });
  }

  // Método para obtener un archivo específico
  getFileUrl(fileName: string): Promise<string> {
    const fileRef = ref(this.storage, `uploads/${fileName}`); // Ajusta la ruta según sea necesario
    return getDownloadURL(fileRef)
      .catch((error) => {
        console.error('Error al obtener la URL del archivo', error);
        throw new Error('Error al obtener la URL: ' + error.message);
      });
  }
  
}
