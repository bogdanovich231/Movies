import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  Auth,
} from 'firebase/auth';
import { getFirestore, collection, addDoc, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCdsPSj9QDNmk3nBf22syd8rWTyhSt7CU0',
  authDomain: 'movie-dc61b.firebaseapp.com',
  projectId: 'movie-dc61b',
  storageBucket: 'movie-dc61b.appspot.com',
  messagingSenderId: '546465847889',
  appId: '1:546465847889:web:f702f4d02fee9b30c9f670',
  measurementId: 'G-8T2RVG7TDN',
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string): Promise<string | null> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return 'Done';
  } catch (err) {
    console.error(err);
    return 'Invalid email or password. Please try again.';
  }
};

const registerWithEmailAndPassword = async (name: string, email: string, password: string): Promise<void> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    console.error(err);
  }
};

const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
  }
};

export { auth, db, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset };
