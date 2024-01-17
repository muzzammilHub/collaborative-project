import axios from "axios"
import { useState } from "react"
import DotLoader from "react-spinners/DotLoader"
import {useDispatch} from "react-redux"
import { addDoctor } from "../utils/doctorSlice"
import { useNavigate } from "react-router-dom"



const DiseasePrediction = () => {
    const [symptoms, setSymptoms] = useState("")
    const [content, setContent] = useState({})
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e)=>{
        setSymptoms(e.target.value)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            setLoader((prev)=>!prev)

            const response = await axios.post("http://127.0.0.1:4000/api/v1/user/disease-predict", {symptoms})

            setLoader((prev)=>!prev)

            const content = response?.data?.gptResponse?.choices[0]?.message
            
            console.log("Response: ",content)
            const structuredContent = content.content?.split("\n")
            setContent(structuredContent)

            
            console.log(structuredContent)

        } catch (error) {
            console.log("Error: ", error)
        }
    }

    const handleClick = async()=>{
        try {
            const specialist = formatting[1]
            console.log(specialist)
            const response = await axios.post("http://127.0.0.1:4000/api/v1/doctor/find-doctor", {specialist})
            console.log(response)

            const doctorList = response?.data?.matchedSpecialityDoctor


            console.log(doctorList)

            dispatch(addDoctor(doctorList))
            navigate("/doctor-recommendation")

        } catch (error) {
            console.log("Error: ", error)
        }
    }

    // console.log(content)
    const predictedDisease = content[0]?.split(",")
    const specialist = content[7] !== ""? content[7] : content[8]
    const formatting = specialist?.split(":")    

  return (
    <div>
        <div className="container mx-auto p-4 w-[40rem]  shadow-lg rounded-lg bg-white">
            <form onSubmit={handleSubmit} className="mb-4 flex items-center">
            
            <input
                type="text"
                placeholder="Enter Symptom"
                onChange={handleChange}
                className="p-2 mt-2 w-[30rem] border rounded-md"
            />
            <button type="submit" className="mt-2 ml-[0.8rem] py-2 px-1 bg-orange-500 text-white  rounded-md hover:bg-orange-400">Predict Disease</button>
            </form>

            

            {content && content.length > 0 && predictedDisease && formatting && formatting.length > 0 && (
            <div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Predicted Disease:</h2>
                <ul>
                {predictedDisease?.map((data, index) => (
                    <li key={index} className="text-green-600">{data !== "" && data}</li>
                ))}
                </ul>
            </div>
           

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Brief Description of Disease:</h2>
                {Array.isArray(content) && content.slice(1, 7).map((text, index) => (
                    <p key={index} className="mb-2">{text !== "" && text}</p>
                ))}
            </div>

            <div>
               <p className="text-xl mb-2 font-semibold">Specialist Doctor:</p>
                <p className="text-red-600">{formatting[1]}</p>
            </div>
            <button 
            onClick={handleClick} 
            className="mt-2 ml-[28.5rem] py-2 px-1 bg-blue-600 text-white  rounded-md hover:bg-blue-400">
                Consult to Specialist
            </button>
            </div>
            )}
            <div>
            </div>
        </div>
    <div>
        {loader && <DotLoader className="mx-auto mt-[17rem]"/>}
    </div>
  </div>
  )
}

export default DiseasePrediction