import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Style.css';

export const LoginForm = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8081/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      const contentType = response.headers.get('Content-Type');
      const isJson = contentType && contentType.includes('application/json');

      if (response.ok) {
        const data = isJson ? await response.json() : null;
        const token = data?.token || null; 
        alert('Login successful!');
        localStorage.setItem('token', token); 
        navigate('/home');
      } else {
        const error = isJson ? await response.json() : { message: 'Login failed' };
        alert('Error: ' + error.message);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error: Unable to reach the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={input.email}
          onChange={handleInput}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={input.password}
          onChange={handleInput}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <div>
          <p>Don't have an account?</p>
          <button type="button" onClick={() => navigate('/signin')}>Sign Up</button>
        </div>
      </form>
    </>
  );
};
