import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from '../login/login';
import { Game } from '../game/game';
export function Home() {
    const [scores, setScores] = React.useState([]);
    React.useEffect(() => {
        fetch('/api/score')
            .then((response)=>response.json())
            .then((scores) =>{
                setScores(scores);
            })
    },[]);
    const leaderboard = [];
    if (scores.length) {
        for(const [i, score] of scores.entries()){
            leaderboard.push(
                <tr key = {i}>
                    <td>{score.name}</td>
                    <td>{score.score}</td>
                    <td>{score.date}</td>
                </tr>
            );
        }
    }else{
        leaderboard.push(
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
        <thead>
            <th>Name</th>
            <th>Points</th>
            <th>Date</th>
        </thead>
        <tbody id = 'scores'>
            {leaderboard}
        </tbody>
    </table>
    <Button variant = 'primary' onClick={() => navigate('/game')}>Play</Button>
    <p></p>
    <Button variant = 'primary' onClick={() => navigate('/login')}>logout</Button>
    <p></p>
    <a className = "btn btn-info" href = "https://github.com/cepsugar-del/webworm/blob/main/index.html">My GitHub</a>
    </main>);
}