import React, { useState } from 'react';
import '../componenet_styling/login.css';
import { useNavigate } from 'react-router-dom'; 
import { useLoginMutation } from '../RTKQuery/Slices/LoginSlice'; // ← import RTK Query hook

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const [login, { isLoading }] = useLoginMutation(); // ← use mutation hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password }).unwrap();
      if(response.message); // success message
      navigate('/dashboard'); 
      
    } catch (err) {
      setError(err.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Inventory System</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setError('')} 
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setError('')}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
