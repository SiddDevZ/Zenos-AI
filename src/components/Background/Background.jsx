import './Background.css'; // Import the CSS file for styles
import React from 'react'

const Background = () => {
  return (
    <div className='background-parent'>
      <div className='bg-shape bg-teal opacity-50 bg-blur'></div>
    </div>
  );
};

export default Background;