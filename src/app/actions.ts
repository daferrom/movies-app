"use server"
// import { useRouter } from 'next/navigation';
import { sessionOptions, SessionData, defaultSession } from "./lib"
import { getIronSession } from "iron-session"
import { redirect } from "next/navigation";
import { cookies } from "next/headers"

let useremail = "diegoferro@57blocks.com"
let userpassword = "iegoferro@57blocks.com"
let isPro = true

export const getSession = async () => {
    
    const session = await getIronSession<SessionData>(cookies(), sessionOptions)
    

    if(!session.isLoggedIn){
        sessionOptions.isLoggedIn = defaultSession.isLoggedIn
    }

    return session;
}

export const login = async (prevState:{error:undefined | string}, formData:FormData) => {
    const session = await getSession()

    // const formUsername = formData.get("username") as string
    const formUserEmail = formData.get("useremail") as string
    const formPassword = formData.get("password") as string

    // TODO: Create a DB if ther is time
    // Check user in the DB
    // const user = await.db.getUser({username, password})

    // handling of wrong credentials on input
    // if(formUsername !== username){
    //     return {error:"Wrong Credentials!"}
    // }


    if((formUserEmail !== useremail) && (formPassword !== userpassword)){

        return {error:"Wrong Credentials!"}
    }

    session.userId= "1";
    // session.username = formUsername;
    session.userEmail = formUserEmail
    session.isPro = isPro;
    session.isLoggedIn = true;
    
    await session.save();
    redirect("/Home", );
    // router.push('/')
}
export const logout = async () => {
    const session = await getSession()
    // session destroy removes the cookie of the session //
    session.destroy()
    redirect("/Login")

}