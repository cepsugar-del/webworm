import React from 'react';
import "../app.css";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from '../login/login';
import { Home } from '../home/home';
export function Game(person){
    const userName= person.userName;
    const[possibilities, setPosb] = React.useState([]);
    const[scripture, setScrip] = React.useState([]);
    const[revealed,reveal] = React.useState("")
    const [guesses,setGuesses] = React.useState([]);
    const [ans,setAns] = React.useState("");
    const [done,setDone] = React.useState(false);
    const [pnts,setpnts] = React.useState("");
    React.useEffect(() =>{
        fetch('https://bible-api/data/kjv/random')
            .then((response) => response.json())
            .then((data =>{
                setAns(`${data.book} ${data.chapter}:${data.verse}`);
                setScrip(data.text);
            }))
            .catch();
    },[]);
    React.useEffect(() =>{
        if (scripture.length ===0) return;
        const interval = setInterval(() => {
            if(done) return;
            setScrip(previous =>{
                if(previous.length ===0) return previous;
                const next = [...previous];
                const word = next.pop();
                reveal(r => word + " " + r);
           return next;
            });
            },2000);
        return () => clearInterval(interval);
    },[scripture]);
    function updateScoresLocal(newScore) {
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
      if (newScore.score > prevScore.score) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }

    if (!found) {
      scores.push(newScore);
    }

    if (scores.length > 10) {
      scores.length = 10;
    }

    localStorage.setItem('scores', JSON.stringify(scores));
    }
    async function saveScore(score){
        const date = new Date().toLocaleDateString();
        const newScore = {name: userName, score: score, date: date};
        await fetch('/api/score',{
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(newScore),
        });
    }
    async function guess(str) {
        document.getElementById("guesser").reset();
        setGuesses(prev => [...prev, str]);   
        if(str === ans){
            saveScore(scripture.length);
            setDone(true);
            setpnts("Your Points: " + scripture.length + "\n Your Opponant's points: " + 15);
            //when I can get input from other players, this will show the actual score of another human
        }
    }

    return(
        <div>
    <h1>Scripture Quest</h1>
    <p id="game_box"><span className = "hidden">{revealed}</span></p>
    <h3 className = "in_game">You have successfully Identified the Scripture</h3>
    <h4 className = "in_game">Your guesses</h4>
    <ul className = "in_game">
        {guesses.map((g, i) => (
            <li key={i}>{g}</li>
        ))}
    </ul>
    <form id = "guesser" className = "in_game" method = 'get' onSubmit={(e) => {e.preventDefault(), guess(e.target.elements[0].value)}}>
        <input type = "text" placeholder = "Enter Guess..." ></input>
    </form>
    <h4 className = "in_game">
        {pnts}
    </h4>
    <p className = "btn btn-warning smaller"><NavLink to = "/home">Exit game</NavLink></p>
    <p><a className = "btn btn-info smaller" href = "https://github.com/cepsugar-del/webworm.git">My GitHub</a></p>
    <p className = "in_game">I may have bitten off more than I can chew <img src = 'https://www.clipartmax.com/png/middle/244-2440674_nervous-sweating-emoji-for-kids-smile-with-sweat-emoji.png' width = "10px" ></img></p>
    </div>
    );
}