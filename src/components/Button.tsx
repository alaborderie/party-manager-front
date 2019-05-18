import styled from 'styled-components';
import { Button } from 'rebass';
import { withTheme } from 'styled-components';

interface IconButtonProps {
  theme: any;
  rounded: boolean | undefined;
  textAlign: string;
  selectableContent: boolean | undefined;
  color: string;
  bg: string;
  isActive: boolean;
}

const IconButton = styled(Button)`
  border-radius: ${(props: IconButtonProps) => props.rounded ? 5 : 0};
  text-align: ${(props: IconButtonProps) => props.textAlign};
  user-select: ${(props: IconButtonProps) => props.selectableContent ? 'auto' : 'none'};
  outline: 0;
  transition: transform .1s ease-out, background .2s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    border: 1px solid ${(props: IconButtonProps) => props.theme.colors[props.color]};
  };
  &:active {
    background: ${(props: IconButtonProps) => props.theme.colors[props.color]};
    color: ${(props: IconButtonProps) => props.theme.colors[props.bg]};
  };
  :disabled {
    opacity: 0.65;
    cursor: not-allowed;
  };
  background: ${(props: IconButtonProps) => props.isActive && props.theme.colors[props.color]};
  color: ${(props: IconButtonProps) => props.isActive && props.theme.colors[props.bg]};
`;

IconButton.defaultProps = {
  ...Button.defaultProps,
  color: 'light2',
  bg: 'dark1',
  selectableContent: false,
  textAlign: 'center',
  rounded: false
};

export default withTheme(IconButton);