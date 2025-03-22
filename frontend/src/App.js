
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';   
import Signup from './components/signup'; 
import Home from './components/home'; 
import HomeAd from './components/admin/HomeAd';
import PendingAd from './components/admin/PendingAd';
import Categorie from './components/categorie'; 
import Commandes from './components/commandes';
import Fournisseur from './components/fournisseur';
import Rapport from './components/rapport';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Admin/homeAd" element={<HomeAd/>} />
        <Route path="/Admin/PendingAd" element={<PendingAd/>} />
        <Route path="/Categorie" element={<Categorie/>} />
        <Route path="/commandes" element={<Commandes/>} />
        <Route path="/fournisseurs" element={<Fournisseur/>} />
        <Route path="/inventory" element={<Rapport/>} />



      </Routes>
    </Router>
  );
}

export default App;
