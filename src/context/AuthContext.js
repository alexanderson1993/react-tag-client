import React, { useMemo } from "react"
import propTypes from "prop-types"
import useLocalStorage from "../hooks/useLocalStorage"
import { navigate } from "@reach/router"
const AuthContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
})

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useLocalStorage("auth-token", "")
  const actions = {
    login: token => {
      setUserId(token)
    },
    logout: () => {
      navigate("/login")
      return setUserId("")
    },
  }
  const user = { user_id: userId }
  const value = useMemo(() => ({ ...actions, user }), [actions, user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: propTypes.node,
}

export function useAuth() {
  return React.useContext(AuthContext)
}

export default AuthProvider
