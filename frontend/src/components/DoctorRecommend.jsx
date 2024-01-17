import React from 'react'
import { useSelector } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

const DoctorRecommend = () => {

    const doctorList = useSelector((store)=>store?.doctor)

    console.log(doctorList)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 m-10">
  {doctorList?.action?.map((doctor, index) => (
    <div key={index} className=" bg-white pt-4 pb-4 rounded-lg border-double border-4 border-blue-400 w-[20rem] mx-auto">
      <img
        className="h-20 w-20 rounded-full mx-auto mb-4"
        src={doctor.avatar}
        alt={`Avatar of ${doctor.firstName} ${doctor.lastName}`}
      />
      <div className="text-center">
        <p className="text-orange-500 font-semibold">{doctor.email}</p>
        <p className="text-lg font-bold mb-1">
          {doctor.firstName} {doctor.lastName}
        </p>
        <p className="text-gray-600 mb-2">Speciality: <span className='text-orange-500 font-semibold'>{doctor.speciality}</span></p>
        <Link 
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold  px-2 py-2 rounded inline-flex items-center'
              to={"/doctor/" + doctor._id.toString()} key={doctor._id}>
                More info <InfoIcon/>
        </Link>
      </div>
    </div>
  ))}
</div>


  )
}

export default DoctorRecommend