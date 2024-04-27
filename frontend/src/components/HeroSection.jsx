import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Hero = () => {
  return (
   
  //   <div className="flex items-center justify-center bg-blue-500 text-white h-screen">
  // <div className="text-center">
  //   <h1 className="text-4xl font-extrabold mb-4">Your Health, Our Priority</h1>
  //   <p className="text-lg">
  //     Empowering you with access to quality healthcare<br />
  //     for a healthier and happier life.
  //   </p>
  //   <button className="bg-white text-blue-500 px-6 py-3 rounded-full mt-6 hover:bg-blue-700 hover:text-white">
  //     Get Started
  //   </button>
  // </div>


  //   {/* Image Column */}
  //   <div className="w-1/2">
  //     <img
  //       src="https://res.cloudinary.com/do7fmmoau/image/upload/v1709980498/HealthApp/HeroSection%20img.png"  // Replace with your image URL
  //       alt="Hero Image"
  //       className="w-full h-full object-cover"
  //     />
  //   </div>
  // </div>
//   <div className="flex items-center justify-center bg-blue-500 text-white h-screen">
//   <div className="max-w-2xl mx-auto flex items-center">
//     {/* Text Column */}
//     <div className="text-center flex-1">
//       <h1 className="text-4xl font-extrabold mb-4">Your Health, Our Priority</h1>
//       <p className="text-lg">
//         Empowering you with access to quality healthcare<br />
//         for a healthier and happier life.
//       </p>
//       <button className="bg-white text-blue-500 px-6 py-3 rounded-full mt-6 hover:bg-blue-700 hover:text-white">
//         Get Started
//       </button>
//     </div>

//     {/* Image Column */}
//     <div className="w-1/2 flex justify-end">
//       <img
//         src="https://res.cloudinary.com/do7fmmoau/image/upload/v1709980498/HealthApp/HeroSection%20img.png"  // Replace with your image URL
//         alt="Hero Image"
//         className="h-full object-cover"
//       />
//     </div>
//   </div>
// </div>


<div className="relative bg-blue-500 text-white h-screen flex items-center overflow-hidden">
  <div className="absolute inset-0 z-10 bg-black opacity-40"></div>
  <div className="container mx-auto relative z-20">
    <div className="flex flex-col lg:flex-row items-center justify-center h-full">
      {/* Text Column */}
      <div className="text-center lg:text-left lg:w-1/2 ml-10">
        <h1 className="text-5xl lg:text-6xl font-extrabold mb-4">Your Health, Our Priority</h1>
        <p className="text-lg lg:text-xl">
          Empowering you with access to quality healthcare<br />
          for a healthier and happier life.
        </p>
        <button className="bg-white text-blue-500 px-8 py-4 rounded-full mt-6 hover:bg-blue-700 hover:text-white">
          Get Started
        </button>
      </div>

      {/* Image Column */}
      <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
        <img
          src="https://res.cloudinary.com/do7fmmoau/image/upload/v1713443099/HealthApp/HeroSection1%20img.jpg"  // Replace with your image URL
          alt="Hero Image"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
</div>


  );
};


export default Hero