import React from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

const FullscreenFlex = styled(Flex)`
  min-height: calc(100vh - 48px)
`;

function Container({ children, xs, sm, md, lg }) {
  return (
    <FullscreenFlex flexDirection="column" bg="dark0" color="light2" alignItems="center" p={2} width={1}>
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
  lg: 0.3
}

export default Container;