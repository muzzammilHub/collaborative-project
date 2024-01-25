import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import { Button, Container, TextField, Typography } from "@mui/material";

const ChatApp = ({setOpenChat}) => {
  const socket = useMemo(() => io("http://127.0.0.1:5000"), []);
  const [message, setMessage] = useState("");
  const [socketId, setSocketId] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);

  console.log(messages);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    socket.on("welcome", (m) => {
      console.log(m);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });

    // Add the sent message to the local state
    setMessages((messages) => [...messages, { message, sender: socket.id }]);
    setMessage("");
  };

  const handleClick = ()=>{
    setOpenChat((prev)=>!prev)
  }

  return (
    <div className="w-[90%] mx-auto my-8 p-6 bg-gray-200 rounded-lg shadow-lg">
    <div className="flex item-center justify-center">
        <h4 className="text-2xl mr-4">
        Welcome to Chat
        </h4>
        <button
        onClick={handleClick}
        className="bg-blue-700 pt-2 pb-2 pl-4 pr-4 text-white font-bold rounded-[50%]"
        >
            X
        </button>
    </div>
    <ul className="overflow-y-auto max-h-60 mb-4">
      {messages.map((message, index) => (
        <li
          key={index}
          className={`mb-2 ${
            message.sender === socket.id ? "text-right" : "text-left"
          }`}
        >
          <span
            className={`inline-block px-3 py-2 rounded-lg ${
              message.sender === socket.id
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {message.message}
          </span>
        </li>
      ))}
    </ul>

    <form onSubmit={handleSubmit} className=" flex items-center">
    
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        id="outlined-basic"
        label="Message"
        variant="outlined"
        className="flex-grow mr-2"
      />
      <TextField
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        id="outlined-basic"
        label="Room"
        variant="outlined"
        className="flex-grow mr-2"
      />
      <button
        type="submit"
        className="pt-4 pb-4 pl-2 pr-2 bg-blue-700 text-white rounded-md"
      >
        Send
      </button>
    </form>
  </div>
  );
};

export default ChatApp;
