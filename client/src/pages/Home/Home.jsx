import React from 'react'
import Carousel from '../../components/Carousel.component';
import { banner, banner1 } from "../../assets/images";

import Homecategories from "../../section/Homecategories";

import ProductsHome from "../../section/ProductsHome";
import Footerbanner from "../../section/Footerbanner";
import FeaturesSection from "../../section/FeaturesSection";



const Home = () => {
  const slides = [
    { image: banner1, text1: "Stay Home & get Your daily needs"
      
     },

    { image: banner, text1: "A Different type of grocery store",
      
     }
  ];
  return (
    <>
        <div className="w-full mx-auto max-lg:hidden ">
      <Carousel slides={slides}/>
    </div>

    <div><Homecategories /></div>

    <div>
      <ProductsHome />
    </div>

    <div><Footerbanner /></div>

 

    
    </>
  )
}

export default Home
