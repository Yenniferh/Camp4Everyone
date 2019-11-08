import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext()
const Consumer = AuthContext.Consumer
const Provider = props => {
  const [isAuth, setAuth] = useState(false)
  useEffect(() => {
    const uid = sessionStorage.getItem('user')
    uid !== null && setAuth(true)
  }, [isAuth])
  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        setAuth: setAuth
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { Provider, Consumer }
