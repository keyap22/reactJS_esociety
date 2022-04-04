// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
// var firebaseConfig = {
//   apiKey: "AIzaSyCDmKRz6Aonskf-dmxkv2v6bs4gu2DIPcE",
//   authDomain: "reactjs-esociety.firebaseapp.com",
//   projectId: "reactjs-esociety",
//   storageBucket: "reactjs-esociety.appspot.com",
//   messagingSenderId: "867526949607",
//   appId: "1:867526949607:web:d310b66869fc38bc3dc042",
  
// };

const firebaseConfig = {
  apiKey: "AIzaSyCQxgMNGeFb1ZPFIv0KXYeP6nWhKjYmDA8",
  authDomain: "reactjs-esociety-4046c.firebaseapp.com",
  projectId: "reactjs-esociety-4046c",
  storageBucket: "reactjs-esociety-4046c.appspot.com",
  messagingSenderId: "774663887574",
  appId: "1:774663887574:web:ce39d6135cd52b49140777",
  measurementId: "G-XGC6226LC6"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const firebase_messaging = firebase.messaging();

firebase_messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});