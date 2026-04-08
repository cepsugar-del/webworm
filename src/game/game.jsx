import React from 'react';
import "../app.css";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from '../login/login';
import { Home } from '../home/home';
import {GameEvent, GameNotifier} from './gameNotifier';
export function Game(person){
    const userName= person.userName;
    const [events, setEvent] = React.useState([]);
    const[possibilities, setPosb] = React.useState([]);
    const[scripture, setScrip] = React.useState([]);
    const[revealed,reveal] = React.useState("")
    const [guesses,setGuesses] = React.useState([]);
    const [ans,setAns] = React.useState("");
    const [done,setDone] = React.useState(false);
    const [pnts,setpnts] = React.useState("");
    const [maxpnts, setmax]=React.useState("");
    React.useEffect(() =>{
        fetch('https://Bible-api.com/data/kjv/random')
            .then((response) => response.json())
            .then((data) =>{
                setAns(`${data.random_verse.book} ${data.random_verse.chapter}:${data.random_verse.verse}`);
                setScrip(data.random_verse.text.split(" "));
                setmax(data.random_verse.text.split("").length);
            })
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
            },750);
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
    React.useEffect(() => {
        GameNotifier.addHandler(handleGameEvent);
        return () =>{
            GameNotifier.removeHandler(handleGameEvent);
        };
    });

    function handleGameEvent(event){
        setEvent([...events,event]);
    }
    async function saveScore(score){
        const date = new Date().toLocaleDateString();
        const newScore = {name: userName, score: score, date: date};
        await fetch('/api/score',{
            method: 'post',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(newScore),
        });
        GameNotifier.broadcastEvent(userName, GameEvent.End, newScore);
    }
    async function guess(str) {
        document.getElementById("guesser").reset();
        console.log(ans);
        setGuesses(prev => [...prev, str]);
        if(str === ans){
            saveScore(scripture.length);
            setDone(true);
            setpnts("Your Points: " + scripture.length + "\n");
        }
    }
    function updateOthers() {
        const otherpeople = [];
        for(const [i,event] of events.entries()){
            let message = "It's a mystery how this message ever showed up on you screen";
            if(event.type === GameEvent.End){
                message = ` scored ${event.value.score}/${maxpnts}`
            } else if (event.type === GameEvent.start){
                message = `wants you to know they're starting a new game now.`;
            }else if (event.type === GameEvent.System){
                message = event.value.msg;
            }

            otherpeople.push(
                <div key={i} className='event'>
                <span className={'player-event'}>{event.from.split('@')[0]}</span>
                {message}
                </div>
            );
        }
        return otherpeople;
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
    <h4 className = "in_game">Other's Progress</h4>
        <span>{userName}</span><div>{updateOthers()}</div>
    <p className = "btn btn-warning smaller"><NavLink to = "/home">Exit game</NavLink></p>
    <p><a className = "btn btn-info smaller" href = "https://github.com/cepsugar-del/webworm.git">My GitHub</a></p>
    </div>
    );
}