import React from 'react';

const Features = () => {
  return (
    <section className="py-16 bg-white-100 mr-5 ml-5">
       <div className="container mx-auto"> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="flex flex-col items-center mb-4">
            <div className="mb-2 flex items-center justify-center">
              <img src="https://res.cloudinary.com/do7fmmoau/image/upload/v1710067319/HealthApp/Feature%20doctor%20icon.png" alt="Icon 1" className="w-20 h-20 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">100,000+ verified doctors</h3>
              <p>All doctors on Lybrate go through a stringent verification process.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center mb-4">
            <div className=" mb-2 flex items-center justify-center">
              <img src="https://res.cloudinary.com/do7fmmoau/image/upload/v1714211642/HealthApp/Access%20icon.png" alt="Icon 2" className="w-20 h-20 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">24*7 access to healthcare</h3>
              <p>Easy access to the best doctors anytime, anywhere.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center mb-4">
            <div className="mb-2 flex items-center justify-center">
              <img src="https://res.cloudinary.com/do7fmmoau/image/upload/v1710081942/HealthApp/Save%20time%20icon.png" alt="Icon 3" className="w-20 h-20 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Save time & money</h3>
              <p>Save up to 70% in time and money spent for consultation.</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center mb-4">
            <div className="mb-2 flex items-center justify-center">
              <img src="https://res.cloudinary.com/do7fmmoau/image/upload/v1710082157/HealthApp/Guarantee%20icon.png" alt="Icon 4" className="w-20 h-20 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">100% care guaranteed</h3>
              <p>Get comprehensive care coordinators.</p>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Features;
