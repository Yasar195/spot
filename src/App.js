import './App.css';
import Home from './pages/Home';
import Des from './pages/Des';
import PeerTopeer from './pages/PeerTopeer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home/>} path="/"/>
        <Route element={<Des />} path="/des"/>
        <Route element={<PeerTopeer/>} path="/peertopeer"/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
