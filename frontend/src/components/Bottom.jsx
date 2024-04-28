import React from 'react';

function App() {
  return (
    <div>
      {/* Your existing content */}
      

      {/* Your bottom section */}
      <section className="bg-black text-white py-16">
  <div className="container mx-auto text-center"> {/* Added text-center class */}
    <h2 className="text-3xl font-bold mb-8">Bottom Section</h2>
    <p className="text-lg mt-25">All HealthService Inside Your Pocket</p>
    <h3>Important Links</h3>
    <div className="flex justify-center">
  <div className="flex flex-wrap justify-center">
    <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 mr-4">Consult Now</button>
    <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 mr-4">Schedule Appointment</button>
    <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 mr-4">Read Blog</button>
    <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4">Discussion Forum</button>
  </div>
</div>



  </div>
</section>

    </div>
  );
}

export default App;
