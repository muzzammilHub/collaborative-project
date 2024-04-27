import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loadSpecialist } from '../actions/loadDoctor'
import { Link, useParams } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info';
import Heading from './Heading'

const Specialist = () => {
    const dispatch = useDispatch()
    const specialist = useSelector((store)=>store.doctor)
    const {id} = useParams()
    console.log("specialist", specialist)
    useEffect(()=>{
        dispatch(loadSpecialist(id))
    }, [])
  return (
    <div>
        <Heading/>
        {specialist  && 
            specialist?.doctor?.ExistingSpecialist.map((specialist, index)=>(
                <div className='ml-10 mr-10 mt-6 flex items-center border p-6 rounded-lg shadow-md bg-white w-[65%]'>
                <div className='mr-6'>
                    <img 
                        className='h-32 w-32 object-cover rounded-full border-4 border-blue-700'
                        src={specialist.avatar}
                        alt={`Dr. ${specialist.firstName} ${specialist.lastName}`}
                    />
                </div>
                <div>
                    <h2 className='text-3xl font-extrabold mb-2 text-gray-900'>
                        Dr. {specialist.firstName} {specialist.lastName}
                    </h2>
                    <p className='text-lg text-gray-700 mb-2'>{specialist.speciality}</p>
                    <p className='text-gray-700 mb-2'>
                        {specialist.clinicAddress}, {specialist.state}, {specialist.country}
                    </p>
                    <p className='text-gray-700 mb-2'>{specialist.phoneNumber}</p>
                    <p className='text-gray-700 mb-4'>{specialist.email}</p>
                </div>
                <Link 
                className='bg-blue-700 hover:bg-blue-500 text-white font-bold  px-2 py-2 rounded inline-flex items-center mt-28 ml-[39%]'
                to={"/doctor/" + specialist._id.toString()} key={index}>
                    More info <InfoIcon/>
                </Link>
            </div>
            ))
        }
    </div>
  )
}

export default Specialist