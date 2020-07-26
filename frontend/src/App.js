import React from 'react';
import logo from './logo.svg';
import {Counter} from './features/counter/Counter';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import Quiz from './quiz'
import Question from './question'
import Options from './options'
import Controls from './controls'

function App() {
    return (
        <div className="App">
            <Quiz/>
            <Question/>
            <Options/>
            <Controls />
        </div>
    );
}

export default App;
