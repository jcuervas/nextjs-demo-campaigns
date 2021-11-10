import firebase from "firebase";

class FirebaseService {
  constructor() {
    if (!firebase.apps.find(a => a.name === "[DEFAULT]")) {
      firebase.initializeApp(process.env.firebaseConfig)
    }
  }

  authenticateUser(){
    return firebase.auth().signInWithEmailAndPassword(process.env.firebaseUser, process.env.firebasePass)
  }

  async uploadFileToStorage (path: string, file: File) {
    await this.authenticateUser();
    const upload = await firebase.storage().ref(path).put(file)
    return await upload.ref.getDownloadURL();
  }
}

export default new FirebaseService()
