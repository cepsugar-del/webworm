import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from  'react-bootstrap/Button';

import '../app.css';

export function Authenticated(person){
    //renames this function to 'navigate' for more readable code
    const navigate = useNavigate();

    function logout(){
        fetch('/api/auth/logout', {
            method: 'delete',
        })
            .catch(() => {
                //do nothing, there's been a problem
            })
            .finally(() => {
                localStorage.removeItem('userName');
                person.onLogout();
            })
    }

    return (
        <div>
            <h2>{person.userName}</h2>
            <Button variant = 'primary' onClick={() => navigate('/home')}>
                Play
            </Button>
            <Button variant = 'secondary' onClick={() => logout()}>
                Logout
            </Button>
        </div>
    );
}