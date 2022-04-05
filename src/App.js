import './App.css';

import { Navbar } from './pages/Navbar';
import { Routes, Route } from 'react-router-dom';
import { About } from './pages/About'
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { Footer } from './pages/Footer';
import { ForgotPassword } from './components/ForgotPassword'
import { Services } from './pages/Services'
// import { RoleAPI } from './components/RoleAPI'
// import { ChildScheduleAPI } from './components/ChildScheduleAPI';
// import { VisitorCategoryAPI } from './components/VisitorCategoryAPI'
// import { DeliverableAPI } from './components/DeliverableAPI';
// import {SecurityGuardAPI} from './components/SecurityGuardAPI'
// import { MemberAPI } from './components/MemberAPI';
// import { VehicleAPI } from './components/VehicleAPI';
// import {SecurityGuardAttendanceAPI} from './components/SecurityGuardAttendanceAPI'
// import {VisitorAPI} from './components/VisitorAPI'
// import {HouseAPI} from './components/HouseAPI'
// import { UserAPI } from './components/UserAPI';
import { ListMembersAPI } from './components/ListMembersAPI';
import { Profile } from './components/Profile';
import { VisitorForm } from './components/VisitorForm'
import { VehicleForm } from './components/VehicleForm'
import { ChildScheduleForm } from './components/ChildScheduleForm'
import { ListVisitorsAPI } from './components/ListVisitorsAPI'
import { UpdateForm } from './components/UpdateForm';
import { UpdateVisitorForm } from './components/UpdateVisitorForm'
import { ListGuardsAPI } from './components/ListGuardsAPI'
import { ListChildrenAPI } from './components/ListChildrenAPI';
import { ListvehiclesAPI } from './components/ListVehiclesAPI';
import { ListDeliverablesAPI } from './components/ListDeliverablesAPI';
//import firebase_app, { requestForToken } from './components/Firebase';
import { useState } from 'react';
import firebase, { auth, getToken1 } from "./components/Firebase"

import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


 import {onMessageListener} from "./components/Firebase"
// import ReactNotificationComponent from './components/ReactNotification';
// import Notifications from './components/Notification';
//import { ToastContainer } from 'react-toastify/dist/components';


function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});

  //keep track of whether we have access to the notifications or not:
  
  const [isTokenFound, setTokenFound] = useState(false);
  getToken1(setTokenFound);
  console.log("isTokenfound :" + isTokenFound)
  console.log("settokenfound :" + setTokenFound)

  const[OTP,setOTP]= useState('')

  // const setupRecaptcha = () => {
  //   //console.log()
  //   window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  //     'size': 'invisible',
  //     'callback': (response) => {
  //       // reCAPTCHA solved, allow signInWithPhoneNumber.
  //       onSignInSubmit();
  //     }
  //   }, firebase.auth);
  // }

  // const onSignInSubmit = (e) => {

  //   e.preventDefault()
  //   setupRecaptcha()
  //   const phoneNumber = "+917284914344"
  //   //window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier()
  //   const appVerifier = window.recaptchaVerifier;
    
  //   console.log(phoneNumber)
  //   console.log(appVerifier)
  //   //const auth = getAuth();
  //   console.log("auth : ",firebase.auth)
  //   signInWithPhoneNumber(firebase.auth, phoneNumber, appVerifier)
  //     .then((confirmationResult) => {
  //       console.log(phoneNumber)
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       window.confirmationResult = confirmationResult;
  //       const code = window.prompt("Enter OTP");
  //       confirmationResult.confirm(code).then((result) => {
  //         // User signed in successfully.
  //         const user = result.user;
  //         console.log("success")
  //         // ...
  //       }).catch((error) => {
  //         // User couldn't sign in (bad verification code?)
  //         // ...
  //       });

  //       // ...
  //     }).catch((error) => {
  //       // Error; SMS not sent
  //       // ...
  //     });
  // }













  const generateRecaptcha=()=>{

    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        //onSignInSubmit();
      }
    }, auth);
  }

  const onSignInSubmit = (e) => {
    e.preventDefault();
    generateRecaptcha();
    const phoneNumber = "+917043599678"
// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier()
     let appVerifier = window.recaptchaVerifier;
    
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      console.log("success phone :" +phoneNumber)
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
  
      window.confirmationResult = confirmationResult;
        const code = window.prompt("Enter OTP");
        confirmationResult.confirm(code).then((result) => {
          console.log("you have entered correct otp"+code)
          // User signed in successfully.
          //const user = result.user;
          console.log("success")
          // ...
        }).catch((error) => {
          // User couldn't sign in (bad verification code?)
         alert("you have entered wrong otp")
         
          // ...
        });

      
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });
const verifyOTP=(e)=>
{
  let otp = e.target.value;
}

   
  }

  //push notification code 
  onMessageListener().then(payload => {
    setShow(true);
    setNotification({title: payload.notification.title, body: payload.notification.body})
    console.log(payload);
  }).catch(err => console.log('failed: ', err));
  
  // const [show, setShow] = useState(false);
  // const [notification, setNotification] = useState({ title: "hi", body: "" });

  // console.log(show, notification);

  // onMessageListener()
  //   .then((payload) => {
  //     setShow(true);
  //     setNotification({
  //       title: payload.notification.title,
  //       body: payload.notification.body,
  //     });
  //     console.log(payload);
  //   })
  //   .catch((err) => console.log("failed: ", err));
  return (
    <div>

      <Navbar />

      <Home />
      <div className="App">
       {/* <ToastContainer onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
          position: 'absolute',
          top: 20,
          right: 20,
          minWidth: 200
        }}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">{notification.title}</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body > 
        </ToastContainer> */}
      <header className="App-header">
        {isTokenFound && <h1> Notification permission enabled  </h1>}
        {!isTokenFound && <h1> Need notification permission  </h1>}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <button onClick={() => setShow(true)}>Show Toast</button>
      </header>


    </div>
      {/* <div id="recaptcha-container"></div>
      <button className="btn btn-primary" value="Send OTP" onClick={onSignInSubmit}>Send OTP</button> */}
      {/* <ReCAPTCHA 
                            //ref={recaptchaRef} size="invisible"
                                sitekey="6Ldw7j8fAAAAAH-bGG_ubTRvVFwXh5zpryvfTgwy"
                                onClick={ onSignInSubmit} onChange={}
                            /> */}

      {/* <RoleAPI />
      <ChildScheduleAPI />
      <VisitorCategoryAPI />
      <DeliverableAPI/>
      <SecurityGuardAPI />
      <MemberAPI/>
      <VehicleAPI/>
      <SecurityGuardAttendanceAPI />
      <VisitorAPI />
      <HouseAPI />
      <UserAPI/> */}

{/* <div>
      {show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
      <Notifications />
      {/* <Fader text="Hello React"></Fader> 
    </div> */}

      <Routes>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        {/* <Route path="/home" element={<Home />}></Route> */}
        <Route path="/login" element={<LoginForm />}></Route>
      
        <Route path="/signup" element={<SignupForm />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/services" element={<Services />}></Route>
        <Route path='/listmembers' element={<ListMembersAPI />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path="/addvisitor" element={<VisitorForm />}></Route>
        <Route path="/addvehicle" element={<VehicleForm />}></Route>
        <Route path="/childschedule" element={<ChildScheduleForm />}></Route>
        <Route path='/listvisitors' element={<ListVisitorsAPI />}></Route>
        <Route path='/listguards' element={<ListGuardsAPI />}></Route>
        <Route path='/listvisitors/update/:id' element={<UpdateVisitorForm />}></Route>
        <Route path='listmembers/update/:id1/:id2' element={<UpdateForm />}></Route>
        <Route path='/listchildren' element={<ListChildrenAPI />}></Route>
        <Route path='/listvehicles' element={<ListvehiclesAPI />}></Route>
        <Route path='/listvehicles' element={<ListvehiclesAPI />}></Route>
        <Route path='/listdeliverables' element={<ListDeliverablesAPI />}></Route>
        {/* <Route path='/sendmail' element={<SendMail/>}></Route> */}

      </Routes>
      <Footer />

      {isTokenFound ? "Notification.permission   enabled" : "Need notification permission" }


    </div>
  );



}








export default App;