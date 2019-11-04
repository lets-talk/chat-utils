// ts-ignore
import * as Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { updateUserData, syncData } from '../store/actions';

const debug = require('debug')('widgets-manager:utils:firebase');

const prodConfig = {
  apiKey: "AIzaSyATST9016Y3SCCnyEM0quH1UoCfbv35MEo",
  authDomain: "lt-generic-store.firebaseapp.com",
  databaseURL: "https://lt-generic-store.firebaseio.com",
  projectId: "lt-generic-store",
  storageBucket: "lt-generic-store.appspot.com",
  messagingSenderId: "855806900184",
  appId: "1:855806900184:web:789d34f4cf40dbd1",
}

const devConfig = {
  apiKey: "AIzaSyDfbyH9rfq5EQEvNXWRE0x9hX8je309D6A",
  authDomain: "letstalkwidgetmanagerdemo.firebaseapp.com",
  databaseURL: "https://letstalkwidgetmanagerdemo.firebaseio.com",
  projectId: "letstalkwidgetmanagerdemo",
  storageBucket: "letstalkwidgetmanagerdemo.appspot.com",
  messagingSenderId: "731912433984",
  appId: "1:731912433984:web:9144d4095c0b055ecb0aa5",
}

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

const collectionName = 'users';
const stateSelector = (state: any) => state;

const initializeFirebaseApp = (store: any): Promise<any> => {
  debug('Going to instantiate firebase with config:', config);
  Firebase.initializeApp(config);

  return new Promise((resolve, reject) => {
    Firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        debug('Got firebase user:', user);
        store.dispatch(updateUserData(user));
        linkStoreWithPath(`${user.uid}`, syncData, stateSelector)(
          Firebase.firestore(),
          store
        );
        resolve();
      } else {
        // User is signed out.
        debug('Firebase user logout');
      }
    });

    Firebase.auth().signInAnonymously().catch(function(error) {
      // Handle Errors here.
      console.error('Firebase auth error:', error);
      reject(error);
      // ...
    });
  });
}

const linkStoreWithDb = (fromDb: any) => {
  return (db: any, store: any) => {
    fromDb(store, db);
  };
}

const linkStoreWithPath = (path: string, actionCreator: any, selector: any) => {
  return (db: any, store: any) => {
    debug('linkStoreWithPath:', path, selector(store.getState()));

    const fromDb = (store: any, db: any) => {
      db
        .collection(collectionName)
        .doc(path)
        .onSnapshot((snapshot: any) => {
          debug('fromDb doc.onSnapshot, snapshot', snapshot.data());
          store.dispatch(actionCreator(snapshot.data()));
        });
    };

    return linkStoreWithDb(fromDb)(db, store);
  };
}

const saveDocument = (collectionName: string, documentId: string, document: any) => {
  return Firebase.firestore()
    .collection(collectionName)
    .doc(documentId)
    .set(document, { merge: true })
}

const updateDocument = (collectionName: string, documentId: string, document: any) => {
  return Firebase.firestore()
    .collection(collectionName)
    .doc(documentId)
    .set(document, { merge: true })
}

export {
  initializeFirebaseApp,
  saveDocument,
  updateDocument,
  linkStoreWithPath,
}
