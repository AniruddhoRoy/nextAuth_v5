"use client"
import { UserInfo } from "@/components/user_info"
import { useCurrentUser } from "@/hooks/useCurrentUser"

export default function HOME(){
    const user = useCurrentUser()
    return <UserInfo label="Client Components" user={user}/>
}