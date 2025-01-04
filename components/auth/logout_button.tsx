"use client"

import { signOut } from "next-auth/react"

interface LogoutButtonProps{
    children?:React.ReactNode,

}

export function LogoutButton({children}:LogoutButtonProps){

    function OnClick(){
        signOut()
    }
    return <span onClick={OnClick}>
        {children}
    </span>
}