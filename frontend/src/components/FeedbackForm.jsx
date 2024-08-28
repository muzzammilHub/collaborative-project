import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { loadSpecificAppointment } from '../actions/loadUser'
import { useParams } from 'react-router-dom'

const FeedbackForm = ({ onSubmit }) => {
    const [rating, setRating] = useState(0)
    const [feedback, setFeedback] = useState("")
    const {id} = useParams()

    console.log(id)
    const {appointment } = useSelector((store)=>store.appointment)

    const app = appointment?.appointment?.find((app) => app._id === id)

    const doctorId  = app.doctor._id

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(loadSpecificAppointment())
    }, [dispatch])

    const handleRatingChange = (e) => {
        setRating(Number(e.target.value))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (rating < 1 || rating > 5) {
            alert("Please select a rating between 1 and 5.")
            return
        }

        try {
            await axios.post(`http://127.0.0.1:4000/api/v1/user/feedback/${doctorId }`, { rating, feedback },{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("userToken")}`
                }
            })
            alert("Feedback submitted successfully.")
            onSubmit({ rating, feedback })
            setRating(0)
            setFeedback("")
        } catch (error) {
            console.error("Error submitting feedback:", error)
            alert("There was an error submitting your feedback. Please try again later.")
        }
    }

    

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Your Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Rating (1 to 5):</label>
                    <select
                        value={rating}
                        onChange={handleRatingChange}
                        className="w-full p-2 border rounded-md"
                        required
                    >
                        <option value={0} disabled>Select a rating</option>
                        {[1, 2, 3, 4, 5].map((rate) => (
                            <option key={rate} value={rate}>{rate}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Feedback:</label>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows="4"
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter your feedback here..."
                        required
                    />
                </div>
                <button
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    )
}

export default FeedbackForm
