import React, { useState } from 'react';
import { Box, Text, Flex } from 'rebass';
import styled, { withTheme } from 'styled-components';

const BoxInput = styled(Box)((props: any) => ({
  transition: 'background .1s ease-out',
  resize: props.resize,
  border: 0,
  outline: 0,
  borderBottom: '1px solid ' + props.theme.colors[props.color],
  background: props.theme.colors[props.bg],
  '&:focus': {
    background: props.theme.colors[props.color],
    color: props.theme.colors[props.bg],
    border: '1px solid ' + props.theme.colors[props.bg],
    '::placeholder': {
      color: props.theme.colors[props.bg],
      filter: 'brightness(250%)'
    }
  },
  '::placeholder': {
    color: props.theme.colors[props.color],
    filter: 'brightness(70%)'
  },
}));

const Label = styled(Text)((props: LabelProps) => ({
  transition: 'opacity .2s ease-out',
  color: props.theme.colors[props.color],
  filter: 'brightness(70%)',
  opacity: props.visible ? 1 : 0
}));

interface LabelProps {
  color: string;
  visible: boolean;
  fontSize: number;
  theme: any;
}

interface InputProps {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  color: string;
  bg: string;
  label: string;
  as: any;
  onFocus: Function;
  onBlur: Function;
  theme: any;
  resize: string;
}

function Input(props: InputProps) {
  const { xs, sm, md, lg, color, label, as } = props;
  const [visible, setVisible] = useState(true);

  function handleOnFocus(e: React.FocusEvent) {
    setVisible(false);
    if (props.onFocus) {
      props.onFocus(e);
    }
  }

  function handleOnBlur(e: React.FocusEvent) {
    setVisible(true);
    if (props.onBlur) {
      props.onBlur(e);
    }
  }

  return (
    <Flex flexDirection="column" width={[xs, sm, md, lg]}>
      {label && (
        <Label color={color} fontSize={1} visible={visible}>{label}</Label>
      )}
      <BoxInput
        {...props}
        as={as}
        width={[xs, sm, md, lg]}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </Flex>
  )
}

Input.defaultProps = {
  xs: 1,
  color: 'light2',
  bg: 'dark0',
  p: 2,
  fontSize: 2,
  as: 'input',
  resize: 'none'
};

export default withTheme(Input);