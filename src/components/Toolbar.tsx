import React, { useState } from 'react';
import { Flex, Box } from 'rebass';
import styled from 'styled-components';
import Toggle from 'react-toggle';
import Button from './Button';
import theme, {darkColors, lightColors} from "../theme";

interface ToolbarProps {
  color: string;
  bg: string;
  title: string;
  children: any;
  setTheme: any;
}

interface LinksListProps {
  theme?: any;
  collapsed?: boolean;
  [propName: string]: any;
}

interface CloseButtonProps {
  theme?: any;
  onClick?: Function;
  [propName: string]: any;
}

const DesktopBar = styled(Flex)`
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    display: none;
  }
  vertical-align: center;
`;

const MobileBar = styled(Flex)`
  @media (min-width: ${props => props.theme.breakpoints[1]}) {
    display: none;
  }
`;

const LinksList: React.FC<LinksListProps> = styled(Flex)`
  height: 100vh;
  opacity: ${(props: any) => props.collapsed ? 0 : 1};
  width: ${(props: any) => props.collapsed ? 0 : '100vw'};
  transition: width 0.5s, opacity 0.2s;
  background: ${props => props.theme.colors.primary1};
  color: ${props => props.theme.colors.secondary2};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const CloseButton: React.FC<CloseButtonProps> = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
`;

const Toolbar = (props: ToolbarProps) => {
  const [collapsed, setCollapsed] = useState(true);

  function handleClickMenu(e: React.MouseEvent) {
    setCollapsed(!collapsed);
  }

  function changeTheme(e: any) {
    const { checked } = e.target;
    const colors = checked ? darkColors : lightColors;
    const newTheme = {...theme, colors};
    props.setTheme(newTheme);
  }

  return (
    <Flex
      px={2}
      color={props.color}
      bg={props.bg}
      alignItems='center'
      justifyContent='space-between'
      style={{ height: 48 }}
    >
      <Box
        p={3}
        width={[0.75, 0.75, 0.3, 0.3]}
      >
        <h3>{props.title}</h3>
      </Box>
      <Box p={3} width={[0, 0, 0.7, 0.9]}>
        <DesktopBar alignItems="center" justifyContent="flex-end">
          {React.Children.map(props.children, child => (
            <Box p={3}>{child}</Box>
          ))}
          <Flex p={3} alignItems='center'>
            <div style={{ marginRight: '5px' }}>Mode sombre</div>
            <Toggle
              icons={false}
              onChange={changeTheme}
            />
          </Flex>
        </DesktopBar>
        <MobileBar alignItems="center" justifyContent="flex-end">
          <Button onClick={handleClickMenu}>&#9776;</Button>
          <LinksList collapsed={collapsed} flexDirection="column" flexWrap="" alignItems="center">
            {React.Children.map(props.children, child => (
              <Box p={3} onClick={handleClickMenu}>{child}</Box>
            ))}
            <Flex p={3} alignItems='center'>
              <div style={{ marginRight: '5px' }}>Mode sombre</div>
              <Toggle
                icons={false}
                onChange={changeTheme}
              />
            </Flex>
            <CloseButton
              onClick={handleClickMenu}
              bg="primary1"
              color="secondary0"
              fontSize={3}
            >
              &times;
            </CloseButton>
          </LinksList>
        </MobileBar>
      </Box>
    </Flex>
  );
};

export default Toolbar;
