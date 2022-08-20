import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { initializeApp } from "firebase/app";

import firebaseConfig from './.env.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};
const logOut = async (auth, setUser) => {
  try {
    await signOut(auth)
      .then(() => {
        setUser("");
      })
  } catch (error) {
    console.error(error);
  }
}

export {
  logOut,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  auth,
}