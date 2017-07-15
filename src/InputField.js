import React, { Component } from 'react';
import {
  Box,
  Label,
  Input,
  Small,
} from 'rebass';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }


  /**
   * Handle the local change event for a field and trigger the prop action
   *
   * @param {object} event
  */
  handleChange(event) {
    this.props.onInputChange(event);
  }

  /**
  * Check the value of a field, set to 1 if no value
  *
  * @param {string} input
  */

  tryNumber(input) {
    const value = parseFloat(input);

    if (Number.isNaN(value)) {
      return 1;
    }
  }

  render() {
    const value = this.props.value
    return (
      <Box mb={3}>
        <Label>{this.props.name}</Label>
        <Small>{this.props.legend}</Small>
        <Input
          placeholder={value}
          bg='gray9'
          mt={1}
          value={this.tryNumber(value)}
          defaultValue={value}
          onBlur={this.handleChange}
          name={this.props.name.toLowerCase()}
        />
      </Box>
    )
  }
}

export default InputField;
