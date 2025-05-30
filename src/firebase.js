import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAtEUx1H4aiDnNvrydFf0_uiAeCn5c0NLM",
  authDomain: "netflix-clone-a77fa.firebaseapp.com",
  projectId: "netflix-clone-a77fa",
  storageBucket: "netflix-clone-a77fa.firebasestorage.app",
  messagingSenderId: "653016665464",
  appId: "1:653016665464:web:efcd38e25786647ddc8c8d"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'user'), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    })
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}

const logout = () => {
  signOut(auth)
}

export { auth, db, login, signUp, logout }