import React from 'react'
import Link from 'next/link'
import { LogoutForm } from './LogoutForm'
import { getSession } from '../actions'

const NavBar = async () => {
  const session = await getSession();
  console.log(session)
  return (
    <nav>
        <Link href='/'>Homepage</Link>
        <Link href='/Login'>Login</Link>
        {session.isLoggedIn && <LogoutForm/>}
    </nav>
  )
}

export default NavBar