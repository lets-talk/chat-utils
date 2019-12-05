import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/firestore';

import { saveDocument, updateDocument, initializeFirebaseApp } from '../firebase_utils';

// const mockInitializeApp = jest.fn();
const mockOnAuthStateChanged = jest.fn();
const mockSignInAnonymously = jest.fn();
const mockSetPersistance = jest.fn();
const mockSet = jest.fn();

mockSet.mockReturnValue(true);

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  auth: jest.fn(() => ({
    onAuthStateChanged: mockOnAuthStateChanged,
    signInAnonymously: mockSignInAnonymously,
    setPersistence: mockSetPersistance,
  })),
  firestore: () => ({
    collection: () => ({
      doc: jest.fn(() => ({
        set: mockSet
      }))
    })
  }),
}));

describe('firebase', () => {
  describe('initializeFirebaseApp', () => {
    const mockStore = jest.fn();

    initializeFirebaseApp(mockStore);

    it('Call the firebase.auth.onAuthStateChanged', () => {
      expect(mockOnAuthStateChanged).toBeCalled();
    });
    
    it('Call the firebase.auth.signInAnonymously', () => {
      expect(mockSignInAnonymously).toBeCalled();
    });
    
    it('Call the firebase.auth.setPersistence', () => {
      expect(mockSetPersistance).toBeCalled();
    });
  });

  describe('saveDocument', () => {
    const mockObject = {
      conversationId: 'MOCK-1',
      content: '<html>',
    };

    saveDocument('mock-collection-name', 'myDocId', mockObject);

    it('Call the firebase sdk with proper params', () => {
      expect(mockSet).toBeCalledWith(mockObject, { merge: true });
    });
  });
  
  describe('updateDocument', () => {
    const mockObject = {
      conversationId: 'MOCK-1',
      content: '<html>',
    };

    updateDocument('mock-collection-name', 'myDocId', mockObject);

    it('Call the firebase sdk with proper params', () => {
      expect(mockSet).toBeCalledWith(mockObject, { merge: true });
    });
  });
})