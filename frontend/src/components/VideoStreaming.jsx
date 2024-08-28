// // import React from 'react'
// // import ReactPlayer from 'react-player'

// // const VideoStreaming = ({
// //   remoteSocketId,
// //   myStream,
// //   remoteStream,
// //   handleCallUser,
// //   sendStream
// // }) => {
// //   return (
// //     <div className="flex flex-col items-center p-4 space-y-4 bg-gray-100 min-h-screen">
// //       <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-md">
// //         <h1 className="text-2xl font-bold text-center">
// //           {remoteSocketId ? 'Connected' : 'Room'}
// //         </h1>
        
// //         {remoteSocketId && (
// //           <div className="flex justify-center space-x-4 mt-4">
// //             <button
// //               onClick={handleCallUser}
// //               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// //             >
// //               Call
// //             </button>
// //             <button
// //               onClick={sendStream}
// //               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
// //             >
// //               Send Stream
// //             </button>
// //           </div>
// //         )}

// //         <div className="flex justify-around items-start mt-8 space-x-4">
// //           {myStream && (
// //             <div className="flex-1">
// //               <h1 className="text-xl font-semibold text-center mb-4">My Stream</h1>
// //               <ReactPlayer
// //                 playing
// //                 muted
// //                 url={myStream}
// //                 width="100%"
// //                 height="auto"
// //                 className="rounded-md shadow-lg"
// //               />
// //             </div>
// //           )}

// //           {remoteStream && (
// //             <div className="flex-1">
// //               <h1 className="text-xl font-semibold text-center mb-4">Remote Stream</h1>
// //               <ReactPlayer
// //                 playing
// //                 muted
// //                 url={remoteStream}
// //                 width="100%"
// //                 height="auto"
// //                 className="rounded-md shadow-lg"
// //               />
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default VideoStreaming


// import React from 'react'
// import ReactPlayer from 'react-player'

// const VideoStreaming = ({
//   remoteSocketId,
//   myStream,
//   remoteStream,
//   handleCallUser,
//   sendStream,
//   handleCancelCall // New prop for canceling the call
// }) => {
//   return (
//     <div className="flex flex-col items-center p-4 space-y-4 bg-gray-100 min-h-screen">
//       <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center">
//           {remoteSocketId ? 'Connected' : 'Room'}
//         </h1>
        
//         {remoteSocketId && (
//           <div className="flex justify-center space-x-4 mt-4">
//             <button
//               onClick={handleCallUser}
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Call
//             </button>
//             <button
//               onClick={sendStream}
//               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//             >
//               Send Stream
//             </button>
//             <button
//               onClick={handleCancelCall} // Add this button to cancel the call
//               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               Cancel Call
//             </button>
//           </div>
//         )}

//         <div className="flex justify-around items-start mt-8 space-x-4">
//           {myStream && (
//             <div className="flex-1">
//               <h1 className="text-xl font-semibold text-center mb-4">My Stream</h1>
//               <ReactPlayer
//                 playing
//                 muted
//                 url={myStream}
//                 width="100%"
//                 height="auto"
//                 className="rounded-md shadow-lg"
//               />
//             </div>
//           )}

//           {remoteStream && (
//             <div className="flex-1">
//               <h1 className="text-xl font-semibold text-center mb-4">Remote Stream</h1>
//               <ReactPlayer
//                 playing
//                 muted
//                 url={remoteStream}
//                 width="100%"
//                 height="auto"
//                 className="rounded-md shadow-lg"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default VideoStreaming



import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import FeedbackForm from './feedbackForm' // Import the FeedbackForm component
import { useNavigate } from 'react-router-dom'

const VideoStreaming = ({
  remoteSocketId,
  myStream,
  remoteStream,
  handleCallUser,
  sendStream,
  handleCancelCall // Prop for canceling the call
}) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const navigate = useNavigate()

  const handleCancelAndShowFeedback = () => {
    handleCancelCall() // Cancel the call
    setShowFeedbackForm(true) // Show the feedback form
  }

  const handleFeedbackSubmit = (feedbackData) => {
    console.log("Feedback submitted:", feedbackData)
    setShowFeedbackForm(false) // Hide the feedback form after submission
    // You can send the feedback data to a server here
    navigate("/")
  }

  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-gray-100 min-h-screen">
      {!showFeedbackForm ? (
        <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center">
            {remoteSocketId ? 'Connected' : 'Room'}
          </h1>

          {remoteSocketId && (
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={handleCallUser}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Call
              </button>
              <button
                onClick={sendStream}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Send Stream
              </button>
              <button
                onClick={handleCancelAndShowFeedback} // Trigger feedback form
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel Call
              </button>
            </div>
          )}

          <div className="flex justify-around items-start mt-8 space-x-4">
            {myStream && (
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-center mb-4">My Stream</h1>
                <ReactPlayer
                  playing
                  muted
                  url={myStream}
                  width="100%"
                  height="auto"
                  className="rounded-md shadow-lg"
                />
              </div>
            )}

            {remoteStream && (
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-center mb-4">Remote Stream</h1>
                <ReactPlayer
                  playing
                  muted
                  url={remoteStream}
                  width="100%"
                  height="auto"
                  className="rounded-md shadow-lg"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
      { localStorage.getItem("userToken") &&   <div className=" w-[30rem] p-4 bg-white rounded-lg shadow-md">
            <FeedbackForm onSubmit={handleFeedbackSubmit} />
          </div>}
        </div>
      )}
    </div>
  )
}

export default VideoStreaming

