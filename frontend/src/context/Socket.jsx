import { useContext } from "react"
import {createContext, useMemo} from "react"
import {io} from "socket.io-client"

export const SocketContext = createContext(null)

export const SocketProvider = ({children})=>{
    const socket = useMemo(()=>{return io("127.0.0.1:4000")},[])
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}