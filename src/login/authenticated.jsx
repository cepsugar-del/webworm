import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from  'react-bootstrap/Button';

import '../app.css';

export function Authenticated(person){
    //renames this function to 'navigate' for more readable code
    const navigate = useNavigate();

    function logout(){
        //get rid of the current signed in person
        localStorage.removeItem('userName');
        //perform the logout function
        person.onLogout();
    }

    return (
        <div>
            <div className = "body">{person.userName}</div>
            <Button variant = 'primary' onClick={() => navigate('/game')}>
                Play
            </Button>
            <Button variant = 'secondary' onClick={() => logout()}>
                Logout
            </Button>
        </div>
    );
}