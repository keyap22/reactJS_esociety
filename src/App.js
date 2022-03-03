import './App.css';

import {Navbar} from './pages/Navbar';
import {Routes, Route} from 'react-router-dom';
import {About} from './pages/About'
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import {Footer} from './pages/Footer';

function App() {
  
  return (
    <div>

      <Navbar/>
      <Home/>
     <Routes>
     <Route path="/contact" element={<Contact/>}></Route>
       <Route path="/about" element={<About/>}></Route>
       <Route path="/home" element={<Home/>}></Route>
       <Route path="/login" element={<LoginForm/>}></Route>
       
       <Route path="/signup" element={<SignupForm/>}></Route>
       
     </Routes>
     <Footer/>
      
    </div>
  );
}

export default App;