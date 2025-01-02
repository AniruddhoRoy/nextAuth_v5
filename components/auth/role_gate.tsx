"use client"

import { UseCurrentRole } from "@/hooks/useCurrentRole"
import { UserRole } from "@prisma/client"
import { FormError } from "../form-error"

interface RoleGateProps{
    children:React.ReactNode,
    allowedRole:UserRole

}

export const RoleGate=({children,allowedRole}:RoleGateProps)=>{
    const role = UseCurrentRole()
    if(role !== allowedRole){
        return <FormError message="You do not have permission"/>
    }
    return<>
    {children}
    </>
}