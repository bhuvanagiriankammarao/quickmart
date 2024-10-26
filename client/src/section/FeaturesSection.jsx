import React from 'react'
import { features } from '../data'

const FeaturesSection = () => {
  return (
    <div className="bg-crystalAqua py-8 font-poppins 
    w-[1440px] h-[300px] ">
      <div className="max-w-6xl mx-auto my-16 flex justify-between items-center">
        {features.map((feature) => (
          <div key={feature.title} className="text-white text-center w-1/3 px-4">
            <h1 className="font-semibold text-custom-32 mb-2">{feature.title}</h1> 
            <p className=" font-400 text-custom-20">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturesSection