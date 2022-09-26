import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Inicio from './components/Inicio'
import Login from './components/Login'
import Menu from './components/Menu';


function App() {
  return (
    <div className="container">
      <Router>
        <Menu />
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/inicio' element={<Inicio />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
