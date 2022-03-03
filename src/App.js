import './App.css';
import { Home } from './components/Home';
import {Navbar} from './pages/Navbar';
import {Routes, Route} from 'react-router-dom';
import {About} from './pages/About'
import { Contact } from './pages/Contact';

function App() {
  //<Home />
  return (
    <div>

      <Navbar/>
     <Routes>
     <Route path="/contact" element={<Contact/>}></Route>
       <Route path="/about" element={<About/>}></Route>
     </Routes>
     
      
    </div>
  );
}

export default App;