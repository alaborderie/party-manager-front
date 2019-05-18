import React from 'react';
import styled from 'styled-components';
import Input from './Input';

interface FormFieldProps {
  field: any;
  form: any;
}

const Error = styled.p`
  color: ${props => props.theme.colors.danger};
`;

function FormField({ field, form: { touched, errors, status }, ...props }: FormFieldProps) {
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