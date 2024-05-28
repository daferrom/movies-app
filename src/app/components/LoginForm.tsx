"use client"
import React from 'react'
import { login } from '../actions'
import { useFormState } from "react-dom"

const LoginForm = () => {

  
  const [state, formAction] = useFormState<any,FormData>(login, undefined)
    
  return (
    <form className="login" action={formAction}>
        <label className="form-label">Email:</label>
        <input 
            type="email" 
            name="useremail"
            required
            placeholder="email"
        />

        {/* <input 
            type="text" 
            name="username"
            required
            placeholder="username"
        /> */}
        <label className="form-label">Password:</label>
        <input 
            type="password" 
            name="password"
            required
            placeholder="password"
        />

        <button className="btn-login">Login</button>
        {state?.error && <p>{state.error}</p>}
    </form>
  )
}

export default LoginForm
