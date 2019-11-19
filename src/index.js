import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import './less/index.less'

ReactDOM.render(<Router><App/></Router>, document.getElementById('root'));
