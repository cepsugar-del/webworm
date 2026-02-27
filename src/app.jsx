import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { Home } from './home/home';
import { AuthStatus } from './login/authState';
function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}
export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthStatus.Authenticated : AuthStatus.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  return (
    <BrowserRouter>
    <div>
  <Routes>
  <Route 
    path='/' 
    element={
      <Login 
        userName={userName} 
        authStatus={authState} 
        onAuthChange={(userName,authState) => {
          setAuthState(authState);
          setUserName(userName);
        }}
      />
    } 
    exact 
  />
  <Route 
    path='/login' 
    element={
      <Login 
        userName={userName} 
        authStatus={authState} 
        onAuthChange={(userName,authState) => {
          setAuthState(authState);
          setUserName(userName);
        }}
      />
    }
  />
  <Route path='/game' element={<Game />} />
  <Route path='/home' element={<Home />} />
  <Route path='*' element={<NotFound />} />
</Routes>
</div>
    </BrowserRouter>);
}