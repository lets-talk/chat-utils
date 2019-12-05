// ts-ignore
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { updateUserData, syncData } from '../store/actions';
import { config } from '../config/firebase';

const debug = require('debug')('widgets-manager:utils:firebase');

const collectionName = 'users';
const stateSelector = (state: any) => state;

const initializeFirebaseApp = (store: any): Promise<any> => {
  debug('Going to instantiate firebase with config:', config);
  firebase.auth().setPersistence('session');
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        debug('Got firebase user:', user);
        store.dispatch(updateUserData(user));
        linkStoreWithPath(`${user.uid}`, syncData, stateSelector)(
          firebase.firestore(),
          store
        );
        resolve();
      } else {
        // User is signed out.
        debug('Firebase user logout');
      }
    });

    firebase.auth().signInAnonymously().catch(function(error) {
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
  return firebase.firestore()
    .collection(collectionName)
    .doc(documentId)
    .set(document, { merge: true })
}

const updateDocument = (collectionName: string, documentId: string, document: any) => {
  return firebase.firestore()
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
