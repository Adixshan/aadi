
import './App.css';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import Home from './Home.js';
import Contest from './Contest.js';



function App() {
  return (
  <Router>
   
      <Routes>
           <Route path='/' element={<Home />} />
           <Route path='/contest' element={<Contest />} />

          
      </Routes>
  
  </Router>
  );
}

export default App;
