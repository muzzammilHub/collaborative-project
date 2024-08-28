import React from 'react'
import Heading from "./Heading"
import Lobby from './Lobby'

const VideoMeetPage = () => {
    const [openLobby, setOpenLobby] = React.useState(false)

    const handleClick = () => {
        setOpenLobby(true)
    }

    const handleCloseLobby = () => {
        setOpenLobby(false)
    }

    return (
        <div>
            <Heading/>
            <div className="mt-[5%] bg-gray-50 flex flex-col items-center">
                <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl mx-auto p-6 space-y-6 lg:space-y-0 lg:space-x-6">
                    <div className="text-center lg:text-left space-y-4">
                        <h1 className="text-3xl lg:text-5xl font-bold text-gray-800">
                            Video Calls and Meetings with Patients
                        </h1>
                        <button
                            onClick={handleClick} 
                            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                            Start Meeting
                        </button>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <img
                            className="rounded-lg shadow-lg"
                            src='https://cdni.iconscout.com/illustration/premium/thumb/video-call-with-doctor-9197010-7492847.png'
                            alt="Video call with doctor"
                        />
                    </div>
                </div>
                {openLobby && (
                    <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                            <Lobby onClose={handleCloseLobby} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VideoMeetPage
