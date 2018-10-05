import React from 'react';
import ReactDOM from 'react-dom';
import EchoApp from './app.jsx';
import Perf from 'react-addons-perf';

// React v15

ReactDOM.render(<EchoApp />, document.getElementById('app'));

module.hot.accept();
window.perf = Perf;