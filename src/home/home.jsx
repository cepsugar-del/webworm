import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from '../login/login';
import { Game } from '../game/game';
export function Home() {
    const [scores, setScores] = React.useState([]);
    React.useEffect(() =>{
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
            setScores(JSON.parse(scoresText));
        }
    },[]);
    const leaderboard = [];
    if (scores.length) {
        for(const [i, score] of scores.entries()){
            leaderboard.push(
                <tr key = {i}>
                    <td>score.name</td>
                    <td>score.score</td>
                    <td>score.date</td>
                </tr>
            );
        }
    }else{
        scoreRows.push(
            <tr key ='0'>
                <td>No winners yet...</td>
            </tr>
        );
    }
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
        <tbody id = 'scores'>
            {leaderboard}
        </tbody>
    </table>
    <NavLink to = "/game" id = "big" className = "btn btn-success">Big Giant Play Button</NavLink>
    <p></p>
    <NavLink to = "/login" className = "btn btn-primary">Logout</NavLink>
    <p></p>
    <a className = "btn btn-info" href = "https://github.com/cepsugar-del/webworm/blob/main/index.html">My GitHub</a>
    </main>);
}