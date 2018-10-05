import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './app.jsx';

ReactDOM.render(<TodoApp />, document.getElementById('app'));

module.hot.accept();