import { useState } from 'react'
import DiseasePrediction from './components/DiseasePrediction'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import DoctorRecommend from './components/DoctorRecommend'
import DoctorDetails from './components/DoctorDetails'
import Appointment from './components/Appointment'


function App() {
  

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DiseasePrediction/>}></Route>
          <Route path='/doctor-recommendation' element={<DoctorRecommend/>}></Route>
          <Route path="/doctor/:id" element={<DoctorDetails/>}></Route>
          <Route path='/appointment' element={<Appointment/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
