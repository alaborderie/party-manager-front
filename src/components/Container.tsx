import React from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

const FullscreenFlex = styled(Flex)`
  min-height: calc(100vh - 48px);
`;

interface ContainerProps {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  bg: string;
  color: string;
  children: any;
}

function Container({ children, xs, sm, md, lg, bg, color }: ContainerProps) {
  return (
    <FullscreenFlex flexDirection="column" bg={bg} color={color} alignItems="center" p={2} width={1}>
      <Box width={[xs, sm, md, lg]}>
        {children}
      </Box>
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
