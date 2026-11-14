// services/uploadService.ts
// Ya no usamos Firebase Storage. Las fotos se comprimen y guardan en Base64 dentro de Firestore.

export async function uploadImage(uri: string, _folder?: string): Promise<string> {
  return uri || '';
}
