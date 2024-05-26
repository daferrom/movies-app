"use server"
import { sessionOptions, SessionData, defaultSession } from "./lib"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"

export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions)
    return session;

    if(!session.isLoggedIn){
        sessionOptions.isLoggedIn = defaultSession.isLoggedIn
    }
}



export const login = async () => {}
export const logout = async () => {}