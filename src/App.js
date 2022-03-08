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
import { RoleAPI } from './components/RoleAPI'
import { ChildScheduleAPI } from './components/ChildScheduleAPI';
import { VisitorCategoryAPI } from './components/VisitorCategoryAPI'
import { DeliverableAPI } from './components/DeliverableAPI';
import {SecurityGuardAPI} from './components/SecurityGuardAPI'
import { MemberAPI } from './components/MemberAPI';

function App() {

  return (
    <div>

      <Navbar />
      <Home />

      <RoleAPI />
      <ChildScheduleAPI />
      <VisitorCategoryAPI />
      <DeliverableAPI/>
      <SecurityGuardAPI />
      <MemberAPI/>
      
      <Routes>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/signup" element={<SignupForm />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/services" element={<Services />}></Route>


      </Routes>
      <Footer />

    </div>
  );
}

export default App;