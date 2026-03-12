import React from 'react';

import Button from 'react-bootstrap/Button';
import {MessageDialog} from './messageDialog';

export function Unauthenticated (person){
    const [userName, setUserName] = React.useState(person.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({email:userName, password: password}),
            headers: {
                'Content-type':'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200){
            localStorage.setItem('userName',userName);
        }else {
            const body = await response.json();
            setDisplayError(`Warning: ${body.msg}`);
        }
    }

    return (
        <>
            <div>
                <div className = 'input-group mb-3'>
                    <span className = 'input-group-text'>@</span>
                    <input className = 'form-control' type = 'text' value = {userName} onChange={(e) => setUserName(e.target.value)} placeholder = 'user@name.com'/>
                </div>
                <div className = 'input-group mb-3'>
                    <span className = 'input-group-text'>P:</span>
                    <input className = 'form-control' type = 'password' onChange={(e) => setPassword(e.target.value)} placeholder = 'password' />
                </div>
            <Button variant = 'primary' onClick={() => loginOrCreate()} disabled = {!userName || !password}>
                Login
            </Button>
            <Button variants = 'secondary' onClick = {() => loginOrCreate()} disabled = {!userName || !password}>
                Create
            </Button>
            </div>

            <MessageDialog message = {displayError} onHide={() => setDisplayError(null)}/>
        </>
    );
}