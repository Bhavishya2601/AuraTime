import React, {createContext, useState, useContext, useEffect, Children} from 'react'
import axios from 'axios'

const UserContext = createContext()

const UserProvider = ({children}) => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
          try{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/dashboard`, {
              withCredentials: true,
            })
            setUserData(response.data)
          } catch (err){
            console.log('Error fetching dashboard data')
            console.log(err)
          }
        }
    
        fetchData()
      }, [])
    
  return (
      <UserContext.Provider value={{userData, setUserData}}>
        {children}
      </UserContext.Provider>
  )
}

export default UserProvider
export const useUser = () => useContext(UserContext);
