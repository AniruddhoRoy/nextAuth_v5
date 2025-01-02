"use client"

import { signOut } from "next-auth/react"
import { Button } from "../ui/button"

interface LogoutButtonProps{
    children?:React.ReactNode,

}

export function LogoutButton({children}:LogoutButtonProps){

    function OnClick(){
        signOut()
    }
    return <Button onClick={OnClick} variant="destructive">
        {children}
    </Button>
}