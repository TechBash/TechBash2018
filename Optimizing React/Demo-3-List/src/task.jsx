import React from 'react';
import PropTypes from 'prop-types';

export default class Task extends React.PureComponent {
    render() {
        return (
            <li className='task'>
                {this.props.task}
                <button className='task-remove' onClick={this.handleRemove}>
                    <i className='fas fa-trash'></i>
                </button>
            </li>
        );
    }

    handleRemove = (e) => {
        e.preventDefault();
        this.props.remove(this.props.task);
    }
}

Task.propTypes = {
    task: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired
};