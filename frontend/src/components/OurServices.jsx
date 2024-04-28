import React from 'react';

const OurServices = () => {
    return (
<div>
  {/* Section for Finding a Doctor */}
  <section className="py-16 bg-red-300">
    <div className="container mx-auto">
      {/* Feature 1 */}
      <div className="flex items-center">
        <div className=" ml-20">
          <img
            src="https://res.cloudinary.com/do7fmmoau/image/upload/v1714211934/HealthApp/FindDoctor4.png"
            alt="Icon 1"
            className=" text-white"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">Find Doctor</h3>
          <p className="text-lg">
            Discover a network of over 100,000 verified doctors on Lybrate.<br />
            Our platform ensures that all doctors undergo a rigorous verification process,<br />
            providing you with a trusted and reliable source for your healthcare needs.<br />
            Easily search and connect with qualified professionals to get the care you deserve.<br />
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4">Find a Doctor</button>
        </div>
      </div>
    </div>
  </section>

  {/* Section for Appointing a Doctor */}
  <section className="py-16 bg-green-300">
    <div className="container mx-auto">
      {/* Feature 2 */}
      <div className="flex items-center ml-40">
        <div>
          <h3 className="text-2xl font-bold mb-2">Schedule Appointment</h3>
          <p className="text-lg">
            Book appointments with ease using our platform.<br />
            Choose from a wide range of specialists and schedule your appointments online.<br />
            Save time and effort by conveniently managing your healthcare appointments.<br />
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4">Appoint a Doctor</button>
        </div>
        <div className="ml-6">
          <img
            src="https://res.cloudinary.com/do7fmmoau/image/upload/v1710102039/HealthApp/ScheduleAppointment3.png"
            alt="Icon 2"
            className=" text-white float-right"
          />
        </div>
      </div>
    </div>
  </section>

  {/* Section for Video Consultation */}
  <section className="py-16 bg-yellow-300">
    <div className="container mx-auto">
      {/* Feature 3 */}
      <div className="flex items-center">
        <div className="mr-6 ml-40">
          <img
            src="https://res.cloudinary.com/do7fmmoau/image/upload/v1710103481/HealthApp/VideoConsult%20icon.png"
            alt="Icon 3"
            className=" text-white"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">Connect with a doctor no matter where you are</h3>
          <p className="text-lg">
            Connect with healthcare professionals through video consultations.<br />
            Experience the convenience of virtual appointments from the comfort of your home.<br />
            Access expert advice and medical care without the need to travel.<br />
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4">Consult Now</button>
        </div>
      </div>
    </div>
  </section>

   {/* Section for Health Blog */}
   <section className="py-16 bg-purple-300">
    <div className="container mx-auto">
      {/* Feature 4 */}
      <div className="flex items-center">
        <div className='ml-40'>
          <h3 className="text-2xl font-bold mb-2">Health Blog</h3>
          <p className="text-lg">
            Stay informed with our health blog, featuring articles on various health topics,<br />
            tips for a healthy lifestyle, and updates on the latest medical advancements.<br />
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4">Read Health Blog</button>
        </div>
        <div className="ml-6">
          <img
            src="https://res.cloudinary.com/do7fmmoau/image/upload/v1710103772/HealthApp/HealthBlog.png"
            alt="Icon 4"
            className="w-96 h-96 text-white float-right"
          />
        </div>
      </div>
    </div>
  </section>

   {/* 2nd last bottom */}
   <section className="py-16 relative">
  <div className="absolute inset-0 flex justify-center items-center">
    {/* Your image */}
    <img
      src="https://res.cloudinary.com/do7fmmoau/image/upload/v1713468486/HealthApp/2nd%20last_bottom.jpg"
      alt="Your Image Alt Text"
      className="w-full h-96 object-cover"
    />
  </div>
  
  {/* Your button */}
  <div className="absolute inset-0 flex justify-center items-center">
    <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Download the app</button>
  </div>
</section>



</div>


    );
};

export default OurServices;
