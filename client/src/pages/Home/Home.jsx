import React from 'react'
import Carousel from '../../components/Carousel.component';
import { banner, banner1 } from "../../assets/images";
import ProductsHome from "../../section/ProductsHome";
import Footerbanner from "../../section/Footerbanner";
import CategoriesHome from '../../section/Category/CategoreisHome';

const Home = () => {
  const slides = [
    { image: banner1, text1: "Stay Home & get Your daily needs"},
    { image: banner, text1: "A Different type of grocery store",}
  ];
  return (
    <>
    <div className="w-full mx-auto max-lg:hidden pt-20 ">
      <Carousel slides={slides}/>
    </div>
    {/* <div><Homecategories /></div> */}
    <div>
      <CategoriesHome />
    </div>
    <div>
      <ProductsHome />
    </div>

    <div>
      <Footerbanner />
    </div>
    </>
  )
}

export default Home
