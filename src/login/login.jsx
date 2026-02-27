import React from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Game } from '../game/game';
import { Home } from '../home/home';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthStatus } from './authState';
export function Login({userName, authStatus, onAuthChange}){
    return(
        <main>
        <div>
            {authStatus !== AuthStatus.Unknown && <h1>Welcome to Scripture Quesst</h1>}
            {authStatus === AuthStatus.Authenticated && (
                <Authenticated userName = {userName} onLogout={() => onAuthChange(userName, AuthStatus.Unauthenticated)}/>
            )}
            {authStatus === AuthStatus.Unauthenticated && (
                <Unauthenticated
                    userName={userName}
                    onLogin={(loginUserName) =>{
                    onAuthChange(loginUserName,AuthStatus.Authenticated);
                }}/>
            )}
            <p><a className = "btn btn-info smaller" href = "https://github.com/cepsugar-del/webworm.git">My GitHub</a></p>
        </div>
        </main>
    )
}

//I copied almost all of the functionality for this page over from the simon react. 