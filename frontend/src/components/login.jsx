
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';  
import '../styles/login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [token, setToken] = useState(null); 
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://mern-gestion-de-stock-production.up.railway.app/login', { email, password });
      console.log('Login successful', response.data);
      
      const { token, redirectUrl } = response.data;

      setToken(token);

      if (redirectUrl) {
        navigate(redirectUrl); 
      } else {
        navigate('/home'); 
      }

    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "Login failed");
      } else {
        setErrorMessage("An error occurred, please try again");
      }
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='bg'>
      <div className='banner'>Système de Gestion des Inventaires</div>
      <div className="home-container">
        <div className="blue"><h1>Connexion</h1></div>
        <form onSubmit={handleLogin}>
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
            <p className='gg'> 
              <Link to="/signup">Vous n'avez pas de compte ?</Link>
            </p>
          </div>
          <button type="submit">Connexion</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
