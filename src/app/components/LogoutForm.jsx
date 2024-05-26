import React from 'react'
import { logout } from '../actions'

export const LogoutForm = () => {
  return (
    <form action={logout}>
        <button>Logout</button>
    </form>
  )
}
