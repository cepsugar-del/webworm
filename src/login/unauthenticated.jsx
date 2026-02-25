import React from 'react';

import Button from 'react-bootstrap/Button';
import {MessageDialog} from './messageDialog';

export function Unauthenticated (person){
    const [userName, setUserName] = React.useState(person.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        localStorage.setItem('userName', userName);
        person.onLogin(uerName);
    }
    async function createUser(){
        localStorage.setItem('userName', userName);
        person.onLogin(userName);
    }
    return (
        <>
        <div>
            <div className = 'input-group mb-3'></div>
            <span className = 'input-group-text'>@</span>
            <input className = 'form-control' type = 'text' value = {userName} onChange={(e) => setUserName(e.target.cvalue)} placeholder = 'user@name.com'></input>
        </div>
        <div className = 'input-group mb-3'>
            <span className = 'input-group-text'>P</span>
            <input className = 'form-control' type = 'password' onChange={(e) => setPassword9e.target.value()} placeholder = 'password' />
        </div>
        <Button variant = 'primary' onClick={() => loginUser()} disabled = {!userName || !password}>
            Login
        </Button>
        <Button variants = 'secondary' onClick = {() => createUser()}>Create</Button>
        </>
    );
}