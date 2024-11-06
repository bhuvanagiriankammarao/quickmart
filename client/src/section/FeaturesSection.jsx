import React from 'react';
import { features } from '../data';

const FeaturesSection = () => {
  return (
    <div className="bg-crystalAqua py-1 my-20 font-poppins w-full overflow-hidden">
      <div className="max-w-6xl mx-auto my-16 flex flex-col md:flex-row justify-between items-center">
        {features.map((feature) => (
          <div key={feature.title} className="text-white text-center w-full md:w-1/3 px-4 mb-6 md:mb-0">
            <h1 className="font-semibold text-custom-24 mb-2">{feature.title}</h1> 
            <p className="font-400 text-custom-16">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
