import React from 'react';
import {Box, Flex} from "rebass";
import styled from "styled-components";
import {GroupInterface} from "./CreateGroup";

const ImageContainer = styled(Box)`
flex-basis: 20%;
flex-grow: 0;
`;

const ContentContainer = styled(Box)`
flex-basis: 80%;
display: flex;
flex-direction: column;
`;

function GroupSummary(prop: GroupInterface) {
  return (
    <Flex flexDirection="row">
      <ImageContainer>
        <img style={{ maxWidth: '100%' }} alt="background_img" src={prop.background_img} />
      </ImageContainer>
      <ContentContainer>
        <h3>{prop.name}</h3>
        <p>{prop.description}</p>
      </ContentContainer>
    </Flex>
  )
}

export default GroupSummary;
