import React, { useState } from 'react';
import { Flex, Box } from 'rebass';
import styled from "styled-components";
import Button from "./Button";

interface ToolbarProps {
  color: string;
  bg: string;
  title: string;
  children: any;
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
  background: ${props => props.theme.colors.light2};
  color: ${props => props.theme.colors.dark0};
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
        width={[0.5, 0.5, 0.3, 0.3]}
      >
        <h3>{props.title}</h3>
      </Box>
      <Box p={3} width={[0, 0, 0.7, 0.9]}>
        <DesktopBar alignItems="center" justifyContent="flex-end">
          {React.Children.map(props.children, child => (
            <Box p={3}>{child}</Box>
          ))}
        </DesktopBar>
        <MobileBar alignItems="center" justifyContent="flex-end">
          <Button onClick={handleClickMenu}>&#9776;</Button>
          <LinksList collapsed={collapsed} flexDirection="column" alignItems="center">
            <React.Fragment>
              {React.Children.map(props.children, child => (
                <Box p={3} onClick={handleClickMenu}>{child}</Box>
              ))}
              <CloseButton
                onClick={handleClickMenu}
                bg="light2"
                color="dark0"
                fontSize={3}
              >
                &times;
              </CloseButton>
            </React.Fragment>
          </LinksList>
        </MobileBar>
      </Box>
    </Flex>
  );
};

export default Toolbar;