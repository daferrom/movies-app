import React from 'react'
import Link from 'next/link'
import { LogoutForm } from './LogoutForm'

const NavBar = () => {
  return (
    <nav>
        <Link href='/'>Homepage</Link>
        <Link href='/Login'>Login</Link>
        <LogoutForm/>
    </nav>
  )
}

export default NavBar