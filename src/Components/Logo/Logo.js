import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from '../../brain.png';
import './Logo.css';
const Logo = () => {
  return (
    <Tilt className="tilt p-3 rounded shadow m-2">
       <img src={brain} height="100%" width="100%" alt="brain"/> 
    </Tilt>
  );
};
export default Logo;
