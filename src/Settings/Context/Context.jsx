import { createContext, useEffect, useState } from "react";

export const Context = createContext()
export const ContextProvider = ({children}) => {
    const getToken = window.localStorage.getItem("token")
    const getUser = window.localStorage.getItem("user")
    const [token, setToken] = useState(getToken? getToken : [])
    const [user, setUser] = useState(getUser? JSON.parse(getUser) :[])
    const [name, setName] = useState("")
    const [search, setSearch] = useState([])
    const [movie, setMovie] = useState([])
    const [activePage, setActivePage] = useState(1)
    useEffect(() => {
        if(token){
            window.localStorage.setItem("token", token)
        }
    },[token])
    useEffect(() => {
        if(user){
            window.localStorage.setItem("user", JSON.stringify(user))
        }
    },[user])
    return(
       <Context.Provider value={{activePage , setActivePage , movie, setMovie,search, setSearch,name, setName,token, setToken, user, setUser}}>
            {children}
       </Context.Provider>
    )
}