import React, { useState } from 'react';
import FineTune from './components/FineTune';
import TrainModel from './components/TrainModel';
import GenerateResult from './components/GenerateResult';
import Message from './components/Message';
import './App.css';

function App() {
    const [message, setMessage] = useState('');

    return (
        <div>
            <h1>AI Fine-Tuning and Generation</h1>
            <FineTune />
            <TrainModel />
            <GenerateResult />
            <Message message={message} />
        </div>
    );
}

export default App;
