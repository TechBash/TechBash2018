import React from 'react';
import LoadCreator from './loadcreator.jsx'
import TaskCreator from './taskcreator.jsx'
import TaskList from './tasklist.jsx'

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

    handleAddMultiple = (tasks) => {
        this.setState({
            tasks: [ 
                ...tasks,
                ...this.state.tasks
            ]
        });
    }

    handleAddSingle = (task) => {
        this.setState({
            tasks: [
                task, 
                ...this.state.tasks
            ]
        });
    }

    handleRemove = (task) => { 
        this.setState({
            tasks: this.state.tasks.filter(x => x !== task)
        });
    }
}