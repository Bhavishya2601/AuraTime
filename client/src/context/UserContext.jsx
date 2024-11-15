import React, {createContext, useState, useContext, useEffect, Children} from 'react'
import axios from 'axios'

const UserContext = createContext()

const UserProvider = ({children}) => {
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [reTrigger, setReTrigger] = useState(0)

    useEffect(()=>{
      fetchData()
    }, [reTrigger])

    const refreshUser = () => {
      setReTrigger(prev => prev + 1)
    }

    const fetchData = async () => {
          
          try{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/checkUser`, {
              withCredentials: true,
            })
            setUserData(response.data.user)
            setIsLoggedIn(true)
          } catch (err){
            if (err.response && err.response.status === 401) {
              console.log("User not authorized or not logged in.");
              setIsLoggedIn(false)
            } else {
              console.error("An unexpected error occurred:", err);
            }
          } finally{
            setIsLoading(false)
          }
        }
        
      useEffect(() => {
        fetchData()
      }, [])
      
      useEffect(()=>{
        if (isLoggedIn){
          fetchData()
        }
      }, [isLoggedIn])

  return (
      <UserContext.Provider value={{userData, setUserData, isLoading, isLoggedIn, setIsLoggedIn, refreshUser}}>
        {children}
      </UserContext.Provider>
  )
}

export default UserProvider
export const useUser = () => useContext(UserContext);
