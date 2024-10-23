import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: any;
  private auth: Auth;

  constructor() {
    const app = !getApps().length ? initializeApp(environment.firebaseConfig) : getApps()[0];
    this.storage = getStorage(app);
    this.auth = getAuth(app);
  }

  // Método para subir archivos
  uploadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileRef = ref(this.storage, `uploads/${file.name}`);
      uploadBytes(fileRef, file)
        .then(() => getDownloadURL(fileRef))
        .then((url) => {
          console.log('Archivo subido, URL:', url);
          resolve(url);
        })
        .catch((error) => {
          console.error('Error al subir el archivo:', error);
          reject(new Error('Error al subir el archivo: ' + error.message));
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
    const fileRef = ref(this.storage, `uploads/${fileName}`);
    return getDownloadURL(fileRef)
      .catch((error) => {
        console.error('Error al obtener la URL del archivo', error);
        throw new Error('Error al obtener la URL: ' + error.message);
      });
  }
}
