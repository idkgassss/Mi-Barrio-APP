import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadImage(uri: string, folder: string = 'reportes'): Promise<string> {
  if (!uri) return '';

  try {
    // 1. Usamos XMLHttpRequest en lugar de fetch() para asegurar compatibilidad total en Android/iOS
    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log('Error de XMLHttpRequest:', e);
        reject(new TypeError('Falló la conversión de la imagen'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    // 2. Extraer o generar el nombre del archivo
    const filename = uri.substring(uri.lastIndexOf('/') + 1) || `img_${Date.now()}.jpg`;
    
    // 3. Crear la referencia en Storage
    const storageRef = ref(storage, `${folder}/${filename}`);

    // 4. Forzar el tipo de contenido a imagen JPEG
    const metadata = {
      contentType: 'image/jpeg',
    };

    // 5. Subir a Firebase
    await uploadBytes(storageRef, blob, metadata);

    // 6. Limpiar la memoria del celular (crítico para tu POCO F7)
    // @ts-ignore
    blob.close();

    // 7. Devolver URL
    return await getDownloadURL(storageRef);
    
  } catch (error) {
    console.error("Error crítico al subir a Storage: ", error);
    throw error;
  }
}