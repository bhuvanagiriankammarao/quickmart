
import React from 'react';
import { footerBanner } from '../assets/images';

const Footerbanner = () => {
  return (
    <div className="w-full h-auto">
      <img 
        src={footerBanner} 
        alt="banner"
        className="w-full h-auto"
      />
    </div>
  );
};

export default Footerbanner;
