import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Style.css';

export const SignIn = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const[cpass,setcpass]=useState({confirmPassword: ''})
  const navigate = useNavigate();

  const handleUser = (e) => {
    const { value, name } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (user.password !== user.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch("http://localhost:8083/sign", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      
      const contentType = response.headers.get('Content-Type');
      const isJson = contentType && contentType.includes('application/json');
  
      if (response.ok) {
        const data = isJson ? await response.json() : null;
        console.log('User registered successfully!', data);
        alert('User registered successfully!');
        navigate('/');
      } else {
        const error = await response.json();
        console.error('Error:', error);
        alert('Error during registration: ' + error.message);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error: Unable to reach the server.');
    }
  };

  const inputStyle =
    user.password && user.confirmPassword && user.password !== user.confirmPassword
      ? { border: '1px solid red' }
      : {};

const passwordFieldStyle = user.password && user.confirmPassword && user.password !== user.confirmPassword ? { border: '1px solid red' } : {};
const confirmPasswordFieldStyle = user.password && user.confirmPassword && user.password !== user.confirmPassword ? { border: '1px solid red' } : {};


  return (
    <>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleUser}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleUser}
          style={inputStyle}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          onChange={handleUser}
          style={inputStyle}
          required
        />
        <button type="submit">Sign In</button>
        <div>
          <p>If you already have an account:</p>
          <button type="button" onClick={() => navigate('/')}>
            Login
          </button>
        </div>
      </form>
    </>
  );
};
