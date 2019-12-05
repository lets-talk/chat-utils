// Config file
import { config } from '../config/firebase';
import * as firebase from 'firebase';

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
