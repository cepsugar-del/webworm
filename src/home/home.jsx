import React from 'react';

export function Home() {
    return(
        <div>
        <h1>Welcome {player}</h1>
    <table class = "t caption-top table table-danger table-striped-columns">
        <caption class = "centered"><b>Leaderboard</b></caption>
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
    <NavLink to = "game" id = "big" class = "btn btn-success">Big Giant Play Button</NavLink>
    <p></p>
    <NavLink to = "login" class = "btn btn-primary">Logout</NavLink>
    <p></p>
    <a class = "btn btn-info" href = "https://github.com/cepsugar-del/webworm/blob/main/index.html">My GitHub</a>
    </div>);
}