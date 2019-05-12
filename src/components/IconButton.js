import styled from 'styled-components';
import { Button } from 'rebass';
import { withTheme } from 'styled-components';

const IconButton = styled(Button)(props => ({
  borderRadius: props.rounded ? 5 : 0,
  textAlign: props.textAlign,
  userSelect: props.selectableContent ? 'auto' : 'none',
  outline: 0,
  transition: 'transform .1s ease-out, background .2s ease',
  '&:hover': {
    cursor: 'pointer',
    transform: 'scale(1.1)',
    border: '1px solid ' + props.theme.colors[props.color]
  },
  '&:active': {
    background: props.theme.colors[props.color],
    color: props.theme.colors[props.bg]
  },
  ':disabled': {
    opacity: 0.65,
    cursor: 'not-allowed'
  },
  background: props.isActive && props.theme.colors[props.color],
  color: props.isActive && props.theme.colors[props.bg]
}));

IconButton.defaultProps = {
  ...Button.defaultProps,
  color: 'light2',
  bg: 'dark1',
  activeColor: 'white',
  selectableContent: false,
  textAlign: 'center',
  rounded: false
};

export default withTheme(IconButton);