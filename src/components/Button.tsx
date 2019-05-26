import styled from 'styled-components';
import { Button as RebassButton } from 'rebass';
import { withTheme } from 'styled-components';

export interface ButtonProps {
  theme: any;
  rounded?: boolean | undefined;
  textAlign?: string;
  selectableContent?: boolean | undefined;
  color: string;
  bg: string;
  isActive?: boolean;
  [propName: string]: any;
}

const Button = styled(RebassButton)`
  border-radius: ${(props: ButtonProps) => props.rounded ? 30 : 0};
  text-align: ${(props: ButtonProps) => props.textAlign};
  user-select: ${(props: ButtonProps) => props.selectableContent ? 'auto' : 'none'};
  outline: 0;
  transition: transform .1s ease-out, background .2s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    border: 1px solid ${(props: ButtonProps) => props.theme.colors[props.color]};
  };
  &:active {
    background: ${(props: ButtonProps) => props.theme.colors[props.color]};
    color: ${(props: ButtonProps) => props.theme.colors[props.bg]};
  };
  :disabled {
    opacity: 0.65;
    cursor: not-allowed;
  };
  background: ${(props: ButtonProps) => props.isActive && props.theme.colors[props.color]};
  color: ${(props: ButtonProps) => props.isActive && props.theme.colors[props.bg]};
`;

// @ts-ignore
Button.defaultProps = {
  ...RebassButton.defaultProps,
  color: 'secondary2',
  bg: 'primary1',
  selectableContent: false,
  textAlign: 'center',
  rounded: false
};

export default withTheme(Button);
