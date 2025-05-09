import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {BiPowerOff} from "react-icons/bi"
const LogOut = () => {
    const navigate = useNavigate();
    const handleClick = async ()=>{
        localStorage.clear();
        navigate("/login");
    }
  return (
    
      <Button onClick={handleClick}>
        < BiPowerOff/>
      </Button>
   
  )
}
 const Button = styled.button`
 display:flex;
 justify-content:center;
 align-items:center;
 padding:0.5rem;
 border-radius:0.5rem;
 background-color:rgb(71, 48, 200);
 border:none;
 cursor:pointer;
svg{
font-size: 1.3rem;
color:#ebe7ff;
}
 `;
export default LogOut
