import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import HomePage from './Components/HomePage.jsx';import LoginPage from './Components/LoginPage.jsx';
import RegisterPage from './Components/RegisterPage.jsx';
import Logout from './Components/Logout.jsx';
import DandM from './Components/DandM.jsx';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage/>} /> 
          <Route path='/logout' element={<Logout/>} />
          <Route path='/DandM' element={<DandM/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
