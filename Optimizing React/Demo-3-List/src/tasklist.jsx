import React from 'react';
import PropTypes from 'prop-types';
import Task from './task.jsx'

export default class TaskList extends React.PureComponent {
    render() {
        if (this.props.tasks.length === 0) {
            return (
                <div className='text-center tasklist tasklist-empty'>
                    You have no tasks. Better think of something.
                </div>
            );
        }

        return (
            <ul className='tasklist'>
                {this.renderTasks(this.props.tasks)}
            </ul>
       );
    }

    renderTasks = function(tasks) {
        return tasks.map(t => <Task task={t} remove={this.props.remove}/>)
    }
}

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    remove: PropTypes.func.isRequired
};