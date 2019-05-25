import styled from "styled-components";

const Spinner = styled.div`
position: absolute;
top: calc(50% - 1.5em);
left: calc(50% - 1.25em);
width: 2.5em;
height: 3em;
border: 3px solid transparent;
border-top-color: #fc2f70;
border-bottom-color: #fc2f70;
border-radius: 50%;
animation: spin-stretch 2s ease infinite;
@keyframes spin-stretch {
  50% {
    transform: rotate(360deg) scale(0.4, 0.33);
    border-width: 8px;
  }
  100% {
    transform: rotate(720deg) scale(1, 1);
    border-width: 3px;
  }
}
`;

export default Spinner;
