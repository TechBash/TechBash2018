import React from 'react';
import PropTypes from 'prop-types';

export default class LoadCreator extends React.PureComponent {
    render() {
        return (<input type='submit' className='loadcreator' onClick={this.handleSubmit} value='Generate Many Tasks' />);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.add(this.generateRandomTasks());
    }

    generateRandomTasks() {
        let tasks = [];

        for (let i = 0; i < 1000; i++)
            tasks[i] = this.generateRandomDescription();

        return tasks;
    }

    generateRandomDescription() {
        return this.generateRandomString() + this.generateRandomString() + this.generateRandomString();
    }

    generateRandomString() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 20);
    }
}

LoadCreator.propTypes = {
    add: PropTypes.func.isRequired
};