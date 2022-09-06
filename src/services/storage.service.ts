import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from '../libs/firebase';

export async function uploadFile(file: File, path?: string) {
  const storageRef = ref(firebaseStorage, `${path || 'images'}/${file.name}`);
  const result = await uploadBytes(storageRef, file);
  if (result) {
    const url = await getDownloadURL(result.ref);
    return url;
  }
  return '';
}
