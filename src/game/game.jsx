import React from 'react';
import "../app.css";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from '../login/login';
import { Home } from '../home/home';
export function Game(){
    const [] = React.useState([]);
    React.useEffect(() =>{
        possibilities = readAsText('scriptures.txt').split("\n");
        scripture = possibilities[Math.floor(Math.random()*possibilities.length)].split(" ");

    });
    return(
        <div>
    <h1>Scripture Quest</h1>
    <p id="game_box"><span className = "hidden">If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.</span></p>
    <h3 className = "in_game">You have successfully Identified the Scripture</h3>
    <h4 className = "in_game">Your guesses</h4>
    <ul className = "in_game">
        <li>James 1:5</li>
    </ul>
    <form className = "in_game" method = 'get'>
        <input type = "text" placeholder = "Enter Guess..."></input>
    </form>
    <h4 className = "in_game">
        Your Points: <span className = "points_disp">10</span>
    </h4>
    <h4 className = "in_game">Your Ranking: <span className = "rank">1/1</span></h4>
    <p className = "btn btn-warning smaller"><NavLink to = "/home">Exit game</NavLink></p>
    <p><a className = "btn btn-info smaller" href = "https://github.com/cepsugar-del/webworm.git">My GitHub</a></p>
    <p className = "in_game">I may have bitten off more than I can chew <img src = 'https://www.clipartmax.com/png/middle/244-2440674_nervous-sweating-emoji-for-kids-smile-with-sweat-emoji.png' width = "10px" ></img></p>
    </div>
    );
}