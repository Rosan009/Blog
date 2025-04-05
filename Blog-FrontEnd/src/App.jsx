import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {LoginForm} from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import { SignIn } from './components/SignIn';
import Home from './components/Home';



function App() {

  return (

    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/home" element={<Home/>}/>
      </Route>
    </Routes>
  );
}

export default App;
