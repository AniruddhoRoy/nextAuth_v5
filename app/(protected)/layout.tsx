import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"

export default async function ProtectedLayout({children}:{children:React.ReactNode}){
    const session = await auth()
    return <SessionProvider session={session}>

    <div className="h-full flex flex-col gap-y-5 items-center justify-center bg-sky-500">
        {children}
    </div>
    </SessionProvider>
    
    

}