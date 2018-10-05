import React from 'react';
import LoadCreator from './loadcreator.jsx'
import TaskCreator from './taskcreator.jsx'
import TaskList from './tasklist.jsx'
import GuidGenerator from './guid.js'

export default class TodoApp extends React.PureComponent {
    state = {
        tasks: []
    };

    render() {
        return (
            <div>
                <h1 className='text-center'>Todo List</h1>
                <LoadCreator add={this.handleAddMultiple} />
                <TaskCreator add={this.handleAddSingle} />
                <TaskList tasks={this.state.tasks} remove={this.handleRemove} />
            </div>
        );
    }

    createKeyedTask = (task) => {
        return { key: GuidGenerator(), value: task };
    }

    handleAddMultiple = (tasks) => {
        this.setState({
            tasks: [ 
                ...tasks.map(t => this.createKeyedTask(t)),
                ...this.state.tasks
            ]
        });
    }

    handleAddSingle = (task) => {
        this.setState({
            tasks: [
                this.createKeyedTask(task), 
                ...this.state.tasks
            ]
        });
    }

    handleRemove = (key) => { 
        this.setState({
            tasks: this.state.tasks.filter(x => x.key !== key)
        });
    }
}