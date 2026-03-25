import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { Home } from './home/home';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
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
                authState={authState} 
                onAuthChange={(userName,authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            } 
            exact 
          />
          <Route path='/game' element={<Game userName = {userName}/>} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <footer>
          <a href = "https://github.com/cepsugar-del/webworm.git">Webworm</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}
function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}
export default App;