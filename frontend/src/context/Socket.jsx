import { useContext } from "react"
import {createContext, useMemo} from "react"
import {io} from "socket.io-client"

export const SocketContext = createContext(null)

export const SocketProvider = ({children})=>{
    const socket = useMemo(()=>{return io("http://127.0.0.1:5000")},[])
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}