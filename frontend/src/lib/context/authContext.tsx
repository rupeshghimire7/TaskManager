import { useState, useEffect, createContext } from "react"
import axiosInstance from "../utils/api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { User } from "../types/user"

export const AuthContext = createContext({
  user: {
    name: "",
    email: "",
    username: "",
  },
  saveUser: (currentUser: any) => {
    console.log(currentUser)
    return
  },
  isLoggedIn: false,
  saveLoginStatus: (status: boolean) => {
    console.log(status)
    return
  },
  logout: () => {},
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    username: "",
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  const saveUser = (currentUser: any) => {
    setUser(currentUser)
  }

  const saveLoginStatus = (status: boolean) => {
    setIsLoggedIn(status)
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      axiosInstance
        .get("/users/profile/", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setUser(response.data)
          setIsLoggedIn(true)
        })

        .catch((error) => {
          console.error("Error fetching user:", error)
        })
    } else {
      navigate("/login")
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    setUser({
      name: "",
      email: "",
      username: "",
    })
    setIsLoggedIn(false)
    navigate("/login")
    toast.success("Logged Out Successfully!!!")
  }

  return (
    <>
      <AuthContext.Provider
        value={{ user, saveUser, isLoggedIn, saveLoginStatus, logout }}
      >
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default AuthProvider
