import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"
import { NavBar } from "./_components/navbar"

export default async function ProtectedLayout({children}:{children:React.ReactNode}){
    const session = await auth()
    return <SessionProvider session={session}>

    <div className="h-full flex flex-col gap-y-5 items-center justify-center bg-sky-500">
    <NavBar></NavBar>
        {children}
    </div>
    </SessionProvider>
    
    

}