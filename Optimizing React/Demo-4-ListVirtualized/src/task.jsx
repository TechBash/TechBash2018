import React from 'react';
import PropTypes from 'prop-types';

export default class Task extends React.PureComponent {
    render() {
        return (
            <li className='task' style={this.props.style}>
                {this.props.task.value}
                <button className='task-remove' onClick={this.handleRemove}>
                    <i className='fas fa-trash'></i>
                </button>
            </li>
        );
    }

    handleRemove = (event) => {
        event.preventDefault();
        this.props.remove(this.props.task.key);
    }
}

Task.propTypes = {
    task: PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    }).isRequired,
    remove: PropTypes.func.isRequired,
    style: PropTypes.string
};