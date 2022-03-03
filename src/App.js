import './App.css';

import {Navbar} from './pages/Navbar';
import {Routes, Route} from 'react-router-dom';
import {About} from './pages/About'
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';

function App() {
  
  return (
    <div>

      <Navbar/>
      <Home/>
     <Routes>
     <Route path="/contact" element={<Contact/>}></Route>
       <Route path="/about" element={<About/>}></Route>
       <Route path="/home" element={<Home/>}></Route>
       
     </Routes>
     
      
    </div>
  );
}

export default App;