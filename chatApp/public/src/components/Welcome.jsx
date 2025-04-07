import React from 'react'
import styled from 'styled-components';
import Robot from "../assets/robot.gif";
const Welcome = ({currentUser}) => {
  return (
    <div>
      <Container>
        <img src={Robot} alt="Robot" />
        <h1>
            
            Welcome, <span>{currentUser?.username}!</span>
        </h1>
        <h3>
            Please select a chat to start messaging.
        </h3>
      </Container>
    </div>
  )
}
const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
color:white;
img{
height:20rem;
}
span{
color:rgb(71, 48, 200);
}
`;
export default Welcome
