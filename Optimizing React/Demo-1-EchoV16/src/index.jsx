import React from 'react';
import ReactDOM from 'react-dom';
import EchoApp from './app.jsx';

// React v16

ReactDOM.render(<EchoApp />, document.getElementById('app'));

if (process.env.NODE_ENV !== 'production') {
    const {whyDidYouUpdate} = require('why-did-you-update')
    whyDidYouUpdate(React)
}

module.hot.accept();