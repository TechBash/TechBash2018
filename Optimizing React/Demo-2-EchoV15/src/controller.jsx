import React from 'react';
import PropTypes from 'prop-types';

// React v15

export default class Controller extends React.Component {
    state = {
        value: ''
    };

    render() {
        return (
            <form className='controller' onSubmit={this.handleUpdate}>
                <input type='text' className='controller-value'
                    value={this.state.value} onChange={this.handleChange} />
                <input type='submit' className='controller-update' value='Update'/>
            </form>
        );
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
      }

    handleUpdate = (event) => {
        event.preventDefault();
        this.props.onUpdate(this.state.value);
    };
}

Controller.propTypes = {
    onUpdate: PropTypes.func.isRequired
};