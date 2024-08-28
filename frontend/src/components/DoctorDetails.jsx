import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import AppointmentButton from './AppointmentButton'
import Map from './Map'
import SchoolIcon from '@mui/icons-material/School'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import PinDropIcon from '@mui/icons-material/PinDrop'
import Heading from './Heading'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loader from './Loader'

// Custom slider settings
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,  // Hide navigation arrows
    appendDots: dots => (
        <div
            style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "10px",
                margin: "0 auto"
            }}
        >
            <ul style={{ margin: "0px" }}> {dots} </ul>
        </div>
    ),
    customPaging: i => (
        <div
            style={{
                width: "10px",
                height: "10px",
                color: "#fff",
                border: "2px solid #007bff",
                borderRadius: "50%",
                background: "#007bff",
                margin: "0 5px"
            }}
        />
    )
};

const DoctorDetails = () => {
    const { id } = useParams()
    const [doctorDetail, setDoctorDetail] = useState({})
    const [openChat, setOpenChat] = useState(false)
    const [openAppointmentInterface, setOpenAppointmentInterface] = useState(false)
    const [feedback, setFeedback] = useState([])

    const getDoctorDetails = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:4000/api/v1/doctor/doctor-detail/?id=${id}`)
            setDoctorDetail(response.data)
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    const getAllSpecificFeedback = async (id) => {
        try {
            const { data } = await axios.get(`http://127.0.0.1:4000/api/v1/doctor/feedback/${id}`)
            setFeedback(data.feedback)
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    useEffect(() => {
        getDoctorDetails()
        getAllSpecificFeedback(id)
    }, [id])

    const { doctor } = doctorDetail
    const education = doctor?.educationHistory

    if(!doctor || !education || !feedback){
        return <Loader/>
    }

    const rating = ()=>{
        let sum =0
        feedback?.map((f)=> sum += f.rating)

        // console.log(sum)
        let count = 0
        feedback?.map((f)=>count += 1)

        return sum/count
    }

    

    return (
        <div className='pl-[3rem] pr-[3rem] bg-gray-400 h-auto'>
            <Heading />
            <div className='shadow-2xl bg-white h-auto'>
                <div className='flex p-4'>
                    <div className='mr-4 w-[50%]'>
                        <img
                            src={doctor?.avatar}
                            className='h-[21.8rem] mx-auto'
                            alt='Doctor Avatar'
                        />
                    </div>
                    <div className='w-[50%] my-20'>
                        <p className='text-4xl font-semibold text-gray-800 mb-2'>
                            {doctor?.firstName} {doctor?.lastName}
                        </p>
                        <p className='text-gray-600 text-lg'>{doctor?.email}</p>
                        <p className='text-blue-500 font-semibold'>{doctor?.speciality}</p>
                        <p className='text-yellow-500'>⭐ Rating {rating()} out of 5 </p>
                        <p className='text-gray-700'>Preferred Language: <span className='text-orange-500'>English, Hindi</span></p>
                        {!openChat && <div className='mr-[40rem] mt-6'>
                            <AppointmentButton id={id} />
                        </div>}
                    </div>
                </div>
                {feedback.length > 0 && <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4 text-center">Patient Feedback</h2>
                    <Slider {...sliderSettings} className="mb-6">
                        {feedback?.map((data, index) => (
                            <div key={index} className="p-4 mx-2 bg-white border border-gray-300 rounded-lg shadow-md h-[6rem]">
                                <div className="flex items-center mb-2">
                                    <span className="font-semibold text-gray-800">{data.user.firstName} {data.user.lastName}</span>
                                    <span className="ml-2 text-yellow-500">⭐ Rating: {data.rating}</span>
                                </div>
                                <p className="text-gray-700">{data.feedback}</p>
                            </div>
                        ))}
                    </Slider>
                </div>}
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4 text-center">Education <SchoolIcon className='text-blue-800' /></h2>
                    <div className="flex overflow-x-auto space-x-4 justify-center items-center">
                        {education?.map((degree, index) => (
                            <div key={index} className="p-2 bg-white border border-gray-300 rounded-md shadow-sm">
                                {degree}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 relative">
                    <h2 className="text-xl font-semibold mb-4 text-center">Work Experience <LocalHospitalIcon className='text-blue-800' /></h2>
                    <div className='flex relative'>
                        <div className='border-l-2 border-black relative left-[25rem]'></div>
                        <div className="flex flex-col w-[35%] mx-auto space-y-4 relative">
                            {doctor?.workExperience?.map((exp, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute -top-[0.1rem] left-[-3.79rem] w-4 h-4 rounded-full bg-blue-800"></div>
                                    <div className="p-2 bg-white border border-gray-300 rounded-md shadow-sm">
                                        {exp}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-4 mb-4"> {/* Add margin-bottom to the map container */}
                    <h1 className="text-xl font-semibold mb-4 text-center">Clinic Location <PinDropIcon className='text-blue-800' /></h1>
                    <Map />
                </div>
            </div>
        </div>
    )
}

export default DoctorDetails
