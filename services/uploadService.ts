// services/uploadService.ts
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadImage(uri: string, folder: string): Promise<string> {
  if (!uri) return '';
  
  try {
    // 1. Convertir la imagen local en un formato binario (Blob)
    const response = await fetch(uri);
    const blob = await response.blob();
    
    // 2. Crear una referencia única en Firebase Storage
    const filename = `${folder}/reporte_${Date.now()}.jpg`;
    const storageRef = ref(storage, filename);
    
    // 3. Subir el archivo
    await uploadBytes(storageRef, blob);
    
    // 4. Obtener y retornar la URL pública
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    throw new Error("No se pudo subir la imagen del reporte.");
  }
}