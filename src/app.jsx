import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';
export default function App() {
  return (
    <body>
    <h1>Login</h1>
    <form method = 'get'>
        <span>Username</span>
    <input className = "form-control sign_in" type = 'text' placeholder="username"></input></form>
    <form method = 'get'>
    <span>Password</span>
    <input className = "form-control sign_in" type = 'text' placeholder="-------"></input></form>
    <p></p>
    <NavLink className = "btn btn-primary" to = 'home'>Successful Login will lead here</NavLink>
    <p></p>
    <a className = "btn btn-info" href = "https://github.com/cepsugar-del/webworm/blob/main/index.html">My GitHub</a>
    </body>
  );
}