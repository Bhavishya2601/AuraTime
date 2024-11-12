import React, {createContext, useState, useContext, useEffect, Children} from 'react'
import axios from 'axios'
// import Cookies from 'js-cookie'

const UserContext = createContext()

const UserProvider = ({children}) => {
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const fetchData = async () => {
      // const token = Cookies.get('jwt')
          // console.log(token)
          // if (!token){
          //   console.log('User not logged in')
          //   setIsLoading(false)
          //   return 
          // }
          
          try{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/checkUser`, {
              withCredentials: true,
            })
            // console.log('response', response.data.user)
            setUserData(response.data.user)
            setIsLoggedIn(true)
          } catch (err){
            if (err.response && err.response.status === 401) {
              // Unauthorized access, user not logged in
              console.log("User not authorized or not logged in.");
              // setUserData([]); // or you can choose to set an empty object or show a message
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
      <UserContext.Provider value={{userData, setUserData, isLoading, isLoggedIn, setIsLoggedIn}}>
        {children}
      </UserContext.Provider>
  )
}

export default UserProvider
export const useUser = () => useContext(UserContext);
