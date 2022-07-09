import React from 'react';
import images from './images/images';
import './Header.css'


export default function Header() {
  return (
    <header className="cardHeader">
        <img src={images.header}></img>
    </header>
  )
} 
