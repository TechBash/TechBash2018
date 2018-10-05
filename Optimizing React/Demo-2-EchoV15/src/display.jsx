import React from 'react';
import PropTypes from 'prop-types';

// React v15

export default class Display extends React.Component {
    render() {
        return (
            <h3 className='text-center'>{this.props.value}</h3>
        );
    }
}

Display.propTypes = {
    value: PropTypes.string
};