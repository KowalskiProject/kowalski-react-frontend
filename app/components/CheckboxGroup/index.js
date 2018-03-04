/**
*
* CheckboxGroup
*
*/

import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 4px;
  border: 1px solid #aaa;
  padding-left: 10px;
  margin-top: 10px;
`;

export default class CheckboxGroup extends React.Component {
  item = ({ input, label }) => (
    <label htmlFor={input.id}>
      <input type="checkbox" {...input} />
      <span>{label}</span>
    </label>
  );

  handleChange = ({ input, input: { onChange, onBlur }, value }) => (event) => {
    const inputValue = input.value;
    const arr = [...inputValue];
    if (event.target.checked) {
      arr.push(value);
    } else {
      arr.splice(arr.indexOf(value), 1);
    }
    onBlur(arr);
    return onChange(arr);
  };

  field = ({ input, meta, options }) => {
    const { name, onFocus } = input;
    const { component = this.item } = this.props;
    const inputValue = input.value;

    const checkboxes = options.map((option, index) => {
      const { label, value } = option;
      const key = `checkbox-${index}`;

      return React.createElement(component, {
        input: {
          name: `${name}[${index}]`,
          checked: inputValue.includes(value),
          onChange: this.handleChange({ input, value }),
          value,
          onFocus,
        },
        meta,
        label,
        option,
        options,
        key,
      });
    });

    return <CheckboxContainer>{checkboxes}</CheckboxContainer>;
  };

  render() {
    return <Field {...this.props} component={this.field} />;
  }
}

CheckboxGroup.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  options: PropTypes.arrayOf(PropTypes.shape({
  /* eslint-enable react/no-unused-prop-types */
    label: PropTypes.node.isRequired,
    value: PropTypes.node.isRequired,
  })).isRequired,
  component: PropTypes.func,
};
