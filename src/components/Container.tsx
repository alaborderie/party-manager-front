import React from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

const FullscreenFlex = styled(Flex)`
  min-height: calc(100vh - 48px);
`;

const BackgroundImage = styled.img`
  position: absolute;
  opacity: 0.5;
  top: 48px;
  left: 0;
  height: calc(100% - 48px);
  width: 100%;
  z-index: 0;
`;

const Content = styled(Box)`
z-index: 1;
`;

interface ContainerProps {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  bg: string;
  color: string;
  children: any;
  style?: any;
  background_img?: string;
}

function Container({ children, xs, sm, md, lg, bg, color, style, background_img }: ContainerProps) {
  return (
    <FullscreenFlex
      flexDirection="column"
      bg={bg}
      color={color}
      alignItems="center"
      p={2}
      width={1}
      style={style}
    >
      {background_img && (
        <BackgroundImage src={background_img} />
      )}
      <Content width={[xs, sm, md, lg]}>
        {children}
      </Content>
    </FullscreenFlex>
  )
}

Container.defaultProps = {
  xs: 1,
  sm: 0.75,
  md: 0.5,
  lg: 0.3,
  bg: 'primary0',
  color: 'secondary2',
};

export default Container;
