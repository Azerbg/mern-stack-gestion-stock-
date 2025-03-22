// src/components/Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/signup.css';
import { Link, useNavigate } from 'react-router-dom'; 

function Signup() {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(null); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); 
    };
    reader.readAsDataURL(file);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      name,
      phone_number: phoneNumber,
      image,
    };

    try {
      const response = await axios.post('https://mern-gestion-de-stock-production.up.railway.app/signup', userData);
      console.log('Signup successful', response.data);

      if (response.data.status === "approved") {
        navigate('/home');
      } else {
        alert("Your account is pending approval.");
      }

    } catch (error) {
      if (error.response) {
        console.error('Backend error:', error.response.data);
        alert(`image not campatible '}`);
      } else {
        console.error('Error message:', error.message);
        alert(`image not campatible`);
      }
    }
  };

  return (
    <div className='bg'>
      <div className='bannerS'>Systéme de Gestion des Inventaires</div>
      <div className="home-containerS">
        <div className="blueS"><h1>Inscription</h1></div>
        <form onSubmit={handleSignup} className='formula'>
          <div>
            <input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Numéro de téléphone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange} 
              required
            />
          </div>
          <button type="submit">Inscription</button>
        </form>

        <div>
          <p>
            Vous avez déjà un compte?{' '}
            <Link to="/login">Connexion ici</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
