import './App.css';
import { Home } from './components/Home';
import {Navbar} from './pages/Navbar';
import {Routes, Route} from 'react-router-dom';

function App() {
  //<Home />
  return (
    <div>

      <Navbar/>
     <Routes>
       <Route path="" element=""></Route>
     </Routes>
      
    </div>
  );
}

export default App;