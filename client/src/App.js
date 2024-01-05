import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import HomePage from './Components/HomePage.jsx';import LoginPage from './Components/LoginPage.jsx';
import RegisterPage from './Components/RegisterPage.jsx';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage/>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
