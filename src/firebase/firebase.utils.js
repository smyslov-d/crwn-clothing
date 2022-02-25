// v8 code
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyAKZrZiDTiUgFudFUAXKkYqANA0TF0Y2-0",
    authDomain: "crowndb-95d09.firebaseapp.com",
    projectId: "crowndb-95d09",
    storageBucket: "crowndb-95d09.appspot.com",
    messagingSenderId: "204838174582",
    appId: "1:204838174582:web:c1e50d44fb1f044178c457",
    measurementId: "G-PY0DFK9W9E"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);

      }
    }
    return userRef;
  }

 

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;