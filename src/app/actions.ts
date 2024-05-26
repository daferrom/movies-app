"use server"
import { sessionOptions, SessionData, defaultSession } from "./lib"
import { getIronSession } from "iron-session"
import { redirect } from "next/navigation";
import { cookies } from "next/headers"

let username = "diego"
let isPro = true

export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions)
    

    if(!session.isLoggedIn){
        sessionOptions.isLoggedIn = defaultSession.isLoggedIn
    }

    return session;
}

export const login = async (formData:FormData) => {
    const session = await getSession()

    const formUsername = formData.get("username") as string
    const formpassword = formData.get("password") as string

    // TODO: Create a DB if ther is time
    // Check user in the DB
    // const user = await.db.getUser({username, password})

    if(formUsername !== username){
        return {error:"Wrong Credentials!"}
    }

    session.userId= "1";
    session.username = formUsername;
    session.isPro = isPro;
    
    await session.save();
    redirect("/");
}
export const logout = async () => {}