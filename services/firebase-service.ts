import {initializeApp, getApps, FirebaseOptions} from '@firebase/app';
import {getAuth, signInWithEmailAndPassword} from '@firebase/auth';
import {getStorage, uploadBytes, ref, getDownloadURL} from '@firebase/storage';


export class FirebaseService {
  constructor() {
    if (!getApps().find(a => a.name === "[DEFAULT]")) {
      initializeApp(process.env.FIREBASE_CONFIG as FirebaseOptions)
    }
  }

  authenticateUser(){
    return signInWithEmailAndPassword(getAuth(), process.env.FIREBASE_USER, process.env.FIREBASE_PASS)
  }

  async uploadFileToStorage (path: string, file: File) {
    try {
      await this.authenticateUser();
      await uploadBytes(ref(getStorage(), path), file);
      return await getDownloadURL(ref(getStorage(), path));
    } catch (e) {
      console.log({e})
      return null
    }
  }
}
