import React from 'react';
import styled from 'styled-components';
import Input from './Input';

const Error = styled.p`
  color: ${props => props.theme.colors.danger};
`;

function FormField({ field, form: { touched, errors, status }, ...props }) {
  return (
    <div>
      <Input {...field} {...props} />
      {touched[field.name] &&
        errors[field.name] && <Error>{errors[field.name]}</Error>}
      {status && status[field.name]
        && <Error>{status[field.name]}</Error>
      }
    </div>
  )
}

export default FormField;