import './App.css';
import { Home } from './components/Home';
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom';

function App() {
  //<Home />
  return (
    <div>

      <Home />
      <Navbar />
     <Routes>
       <Route path="" element=""></Route>
     </Routes>
      
    </div>
  );
}

export default App;