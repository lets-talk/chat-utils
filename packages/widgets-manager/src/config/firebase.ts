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

export {
  config,
}