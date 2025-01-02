"use server"

import { CurrentUser } from "@/lib/auth"
import { UserRole } from "@prisma/client"

export async function adminFunction(){
    const user= await CurrentUser()
    if(user?.role === UserRole.ADMIN)
    {
        return {success:"Allowed"}
    }
    else{
        return {error:"Forbidden server action"}
    }

}