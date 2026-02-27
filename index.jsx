import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './src/app';

console.log("Made it into index.jsx");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);