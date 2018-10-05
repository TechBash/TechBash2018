import React from 'react';
import PropTypes from 'prop-types';
import Task from './task.jsx'
import VirtualizedList from './virtualizedlist.jsx'

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
            <VirtualizedList 
                rowCount={this.props.tasks.length}
                rowHeight={43}
                rowRenderer={this.renderTask}
                containerClassName='tasklist-scrollContainer'
                listClassName='tasklist' />
       );
    }

    renderTask = (index) => {
        const task = this.props.tasks[index];
        return (<Task key={task.key} task={task} remove={this.props.remove}/>);
    }
}

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })).isRequired,
    remove: PropTypes.func.isRequired
};