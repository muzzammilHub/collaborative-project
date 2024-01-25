import React from 'react'

const ChatComponent = ({setOpenChat}) => {
    const handleClick = ()=>{
        setOpenChat((prev)=>!prev)
    }
  return (
    <div
      onClick={handleClick}
      className=" flex items-center justify-center cursor-pointer w-[8rem] h-12 rounded bg-blue-800 text-white mx-auto"
    >
       <p>Doctor Connect</p>
    </div>
  )
}

export default ChatComponent