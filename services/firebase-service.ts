import {initializeApp, getApps, FirebaseOptions} from '@firebase/app';
import {getAuth, signInWithEmailAndPassword} from '@firebase/auth';
import {getStorage, uploadBytes, ref, getDownloadURL} from '@firebase/storage';


class FirebaseService {
  constructor() {
    if (!getApps().find(a => a.name === "[DEFAULT]")) {
      initializeApp(process.env.firebaseConfig as FirebaseOptions)
    }
  }

  authenticateUser(){
    return signInWithEmailAndPassword(getAuth(), process.env.firebaseUser, process.env.firebasePass)
  }

  async uploadFileToStorage (path: string, file: File) {
    await this.authenticateUser();
    await uploadBytes(ref(getStorage(), path), file)
    return await getDownloadURL(ref(getStorage(), path));
  }
}

export default new FirebaseService()
