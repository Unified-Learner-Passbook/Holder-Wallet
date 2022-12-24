import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Otp from './pages/Otp';
import Register from './pages/Register';
import Login from './pages/Login';
import WalletWorker from './pages/WalletWorker';
import WalletUiStore from './pages/WalletUiStore';

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
          <Route path='/wallet-ui-get' element={<WalletWorker />} />
          <Route path='/wallet-ui-store' element={<WalletUiStore/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
