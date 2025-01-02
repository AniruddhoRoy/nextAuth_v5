"use client"
import { UserInfo } from "@/components/user_info"
import { useCurrentUser } from "@/hooks/useCurrentUser"

export default async function HOME(){
    const user = await useCurrentUser()
    return <UserInfo label="Client Components" user={user}/>
}