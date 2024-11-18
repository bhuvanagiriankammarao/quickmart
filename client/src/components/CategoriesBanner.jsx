import React from 'react';

const CategoriesBanner = () => {
  const banner = {
    title: "Food Grain, Oil & Masala",
    subtitle: "Best Quality Products at Affordable Prices",
    backgroundImageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4PGmMG2tfCSw3sPJw6plYCITl0paCApXSmA&s", // replace with actual image URL
  };

  return (
    <div className="relative w-full h-64 bg-gray-200">
      <img
        src={banner.backgroundImageUrl}
        alt={banner.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl text-white font-bold">{banner.title}</h1>
        <p className="text-xl text-white mt-2">{banner.subtitle}</p>
      </div>
    </div>
  );
};

export default CategoriesBanner;
