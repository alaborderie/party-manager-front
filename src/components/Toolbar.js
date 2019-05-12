import React from 'react';
import { Flex, Box } from 'rebass';

const Toolbar = props => {
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
        <Flex alignItems="center" justifyContent="flex-end">
          {React.Children.map(props.children, child => (
            <Box p={3}>{child}</Box>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}

export default Toolbar;