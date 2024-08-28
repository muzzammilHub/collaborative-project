import { useState } from 'react'
import DiseasePrediction from './components/DiseasePrediction'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import DoctorRecommend from './components/DoctorRecommend'
import DoctorDetails from './components/DoctorDetails'
import Appointment from './components/Appointment'
import Home from './components/Home'
import DoctorSignUp from './components/DoctorSignUp'
import Feature from './components/Feature'
import DoctorLogin from './components/DoctorLogin'
import UserSignUp from './components/UserSignUp'
import UserLogin from './components/UserLogin'
import DoctorPannel from './components/DoctorPannel'
import DoctorMeet from './components/DoctorMeet'
import DoctorList from './components/DoctorList'
import VideoAppComponent from './components/VideoAppComponent'
import FindDoctor from './components/FindDoctor'
import PaymentGateway from './components/PaymentGateway'
import PaymentSuccess from './components/PaymentSuccess'
import HealthBlog from './components/HealthBlog'
import Specialist from './components/Specialist'
import Lobby from './components/Lobby'
import Room from './components/Room'
import VideoMeetPage from './components/VideoMeetPage'
import { Booking } from './components/Booking'


function App() {
  

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/predict-disease' element={<DiseasePrediction/>}></Route>
          <Route path='/doctor-recommendation' element={<DoctorRecommend/>}></Route>
          <Route path="/doctor/:id" element={<DoctorDetails/>}></Route>
          <Route path='/appointment/:id' element={<Appointment/>}></Route>
          <Route path='/appointment-pannel' element={<DoctorPannel/>}></Route>
          <Route path='/doctor-register' element={<DoctorSignUp/>}></Route>
          <Route path='/user-register' element={<UserSignUp/>}></Route>
          <Route path='/user-login' element={<UserLogin/>}></Route>
          <Route path='/features' element={<Feature/>}></Route>
          <Route path='/doctor-login' element={<DoctorLogin/>}></Route>
          <Route path='/doctor-appointment/:id' element={<DoctorMeet/>}></Route>
          <Route path='/doctors' element={<DoctorList/>}></Route>
          <Route path='/video-consultant' element={<VideoAppComponent/>}></Route>
          <Route path='/lobby/:id' element={<VideoMeetPage/>}></Route>
          <Route path='/room/:id' element={<Room/>}></Route>
          <Route path='/find-doctor' element={<FindDoctor/>}></Route>
          <Route path='/payment/:id' element={<PaymentGateway/>}></Route>
          <Route path='/paymentsuccess' element={<PaymentSuccess/>}></Route>
          <Route path='/health-blog' element={<HealthBlog/>}></Route>
          <Route path='/specialist/:id' element={<Specialist/>}></Route>
          <Route path='/booking' element={<Booking/>}></Route>
          
        </Routes>
      </BrowserRouter>
  )
}

export default App
