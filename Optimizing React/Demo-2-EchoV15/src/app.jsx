import React from 'react';
import Controller from './controller.jsx'
import Display from './display.jsx'

// React v15

export default class EchoApp extends React.Component {
    state = {
        value: ''
    };

    render() {
        return (
            <div className='appContainer'>
                <h1 className='text-center'>Echo</h1>
                <Controller onUpdate={this.handleUpdate.bind(this)} />
                <Display value={this.state.value} />
            </div>
        );
    }

    handleUpdate = function (value) {
        this.setState({value: value});
    };
}