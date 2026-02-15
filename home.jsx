import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from '../login/login';
import { Game } from '../game/game';
export function Home() {
    return(
        <main>
        <h1>Welcome User</h1>
    <table className = "t caption-top table table-danger table-striped-columns">
        <caption className = "centered"><b>Leaderboard</b></caption>
        <tr>
            <th>Name</th>
            <th>Games</th>
            <th>Total</th>
            <th>Average</th>
        </tr>
        <tr>
            <td>Player 1</td>
            <td>Games Played</td>
            <td>Total Points</td>
            <td>Average Points</td>
        </tr>
        <tr>
            <td>Player 2</td>
            <td>Games Played</td>
            <td>Total Points</td>
            <td>Average Points</td>
        </tr>
        <tr>
            <td>Player 3</td>
            <td>Games Played</td>
            <td>Total Points</td>
            <td>Average Points</td>
        </tr>
    </table>
    <NavLink to = "/game" id = "big" className = "btn btn-success">Big Giant Play Button</NavLink>
    <p></p>
    <NavLink to = "/login" className = "btn btn-primary">Logout</NavLink>
    <p></p>
    <a className = "btn btn-info" href = "https://github.com/cepsugar-del/webworm/blob/main/index.html">My GitHub</a>
    </main>);
}