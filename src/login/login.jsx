import React from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Game } from '../game/game';
import { Home } from '../home/home';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthStatus } from './authState';
export function Login(){
    return(
        <div>
            {authState !== AuthStatus.Uknown && <h1>Welsom to Scripture Quesst</h1>}
            {authState === AuthStatus.Authenticated && (
                <Authenticated userName = {username} onLogout={() => onAuthChange(userName, AuthStatus.Unauthenticated)}/>
            )}
            {authState === AuthStatus.Unauthenticed && (
                <Unauthenticated
                    userName={userName}
                    onLogin={() => onAuthChange(loginUserName,AuthStatus.Authenticated)}></Unauthenticated>
            )};
        </div>
    )
}

//I copied almost all of the functionality for this page over from the simon react. 