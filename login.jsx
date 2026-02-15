import React from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Game } from '../game/game';
import { Home } from '../home/home';
export function Login(){
    return (
        <div>
            <h1>Login</h1>
    <form method = 'get'>
        <span>Username</span>
    <input className = "form-control sign_in" type = 'text' placeholder="username"></input></form>
    <form method = 'get'>
    <span>Password</span>
    <input className = "form-control sign_in" type = 'text' placeholder="-------"></input></form>
    <p></p>
    <NavLink className = "btn btn-primary" to = '/home'>Successful Login will lead here</NavLink>
    <p></p>
    <a className = "btn btn-info" href = "https://github.com/cepsugar-del/webworm/blob/main/index.html">My GitHub</a>
        </div>
    );
}