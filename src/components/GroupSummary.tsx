import React from 'react';
import {Box} from "rebass";
import styled from "styled-components";
import {GroupInterface} from "./CreateGroup";
import Button from "./Button";

const ImageContainer = styled(Box)`
flex-basis: 30%;
flex-grow: 0;
overflow: hidden;
box-shadow: 0 0 10px #000;

img {
  height: auto;
  max-width: 100%;
}
`;

const ContentContainer = styled(Box)`
flex-basis: 70%;
display: flex;
flex-direction: column;
padding: 10px;
`;

const GroupContainer = styled(Button)`
margin: 10px 0;
display: flex;
flex-direction: row;
`;

export interface GroupSummaryProps extends GroupInterface {
  onClick?: Function;
}

function GroupSummary(props: GroupSummaryProps) {
  return (
    <GroupContainer flexDirection="row" bg="secondary2" color="primary0" onClick={props.onClick}>
      <ImageContainer>
        {props.background_img && <img alt="background_img" src={props.background_img} />}
      </ImageContainer>
      <ContentContainer>
        <h3>{props.name}</h3>
        <p style={{ textAlign: 'start' }}>{props.description}</p>
      </ContentContainer>
    </GroupContainer>
  )
}

export default GroupSummary;
