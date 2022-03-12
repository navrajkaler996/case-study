import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {

const isLoggedIn = useSelector(state => state.isLoggedIn)

  return (
  
    <div className="App">
      <BrowserRouter>
        <Routes>
          {isLoggedIn ?
          <>
          <Route path="/home" element={<Home />}/>
          <Route path="*" element={<Home />}/>
          </>
          :
          <Route path="*" element={<Login />}/>
          }
        </Routes>
      </BrowserRouter>
    </div>
 
  );
}

export default App;
