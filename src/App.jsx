import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Otp from './pages/Otp';
import Register from './pages/Register';
import Login from './pages/Login';
import WalletWorker from './pages/WalletWorker';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/wallet-worker' element={<WalletWorker />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
