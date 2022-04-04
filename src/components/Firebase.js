// Import the functions you need from the SDKs you need
import  {initializeApp}  from "firebase/app";
//import * as firebase from "firebase"; 
//import { getAnalytics } from "firebase/analytics";

import { getMessaging,getToken, onMessage } from "firebase/messaging";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//jeel
//to link firebase project with react project
// const firebaseConfig = {
//   apiKey: "AIzaSyCDmKRz6Aonskf-dmxkv2v6bs4gu2DIPcE",
//   authDomain: "reactjs-esociety.firebaseapp.com",
//   projectId: "reactjs-esociety",
//   storageBucket: "reactjs-esociety.appspot.com",
//   messagingSenderId: "867526949607",
//   appId: "1:867526949607:web:d310b66869fc38bc3dc042",
//   measurementId: "G-V3FJXE2GBC"
// };

//keya
// const firebaseConfig = {
//   apiKey: "AIzaSyBtAm0j6h8md_wXWHFoTHmlpNIyRqTmITI",
//   authDomain: "reactjs-esociety-1bd79.firebaseapp.com",
//   projectId: "reactjs-esociety-1bd79",
//   storageBucket: "reactjs-esociety-1bd79.appspot.com",
//   messagingSenderId: "1092553812330",
//   appId: "1:1092553812330:web:5ae51918becdd8845bdd13",
//   measurementId: "G-9GRVXJVCLP"
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


// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);

const auth = getAuth();
auth.languageCode = 'it';

export {auth , firebase_app};

const firebase_messaging = getMessaging(firebase_app);

export default firebase_app
//const analytics = getAnalytics(app);


const phoneNumber =  "7284914344"//getPhoneNumberFromUserInput();
const appVerifier = window.recaptchaVerifier;


signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      console.log("Error; SMS not sent")
    });

    















export const requestForToken = (setTokenFound) => {
    console.log("token value :" +setTokenFound);

    //keya - BABwMKV1MAQVKWVGq5U6Zi0Nv-lMAf9luEfjimEhGuo8KQxuWTlV5rGFU7FHRzknTH8RQh-63tYcrgiAGMgZfN8
    //jeel - BEVDvSGr8isowYbfZs9zdszbAP53jFV8ZcG0TqL82CViBhY2Sl88ASGcesvqz4T_Dy9x_A0iAVaiBo6sgxgG8wM
     return getToken(firebase_messaging, {vapidKey: 'BClCkuRZPf9c8s45xkA_7GDTgBKU82Yyb7p1yq6_9qHRILli8-tgldoW7MmoOqBOn70iT_5-vQqMl7o5ehtjuo8'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }