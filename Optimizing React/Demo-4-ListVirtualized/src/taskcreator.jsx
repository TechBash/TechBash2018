import React from 'react';
import PropTypes from 'prop-types';

export default class TaskCreator extends React.PureComponent {
    state = { 
        value: '' 
    };

    render() {
        return (
            <form className='creator' onSubmit={this.handleSubmit}>
                <input type='text' className='creator-description' 
                    value={this.state.value} onChange={this.handleDescriptionChange}/>
                <input type='submit' className='creator-add' value='Add'/>
            </form>
        );
    }

    handleDescriptionChange = (event) => {
        this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.add(this.state.value);
        this.setState({value: ''});
    }
}

TaskCreator.propTypes = {
    add: PropTypes.func.isRequired
};