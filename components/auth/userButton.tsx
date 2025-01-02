"use client"

import {DropdownMenu,DropdownMenuContent,DropdownMenuItem , DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/useCurrentUser"

import { Avatar , AvatarFallback , AvatarImage } from "@radix-ui/react-avatar"
import { FaUser } from "react-icons/fa"
import { LogoutButton } from "./logout_button"

import {ExitIcon} from "@radix-ui/react-icons"

export const UserButton = ()=>{
    const user = useCurrentUser()
    return <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={user?.image || ""} className="w-10 h-10 rounded-xl">
                    
                </AvatarImage>
                <AvatarFallback >
                    <FaUser className=" text-blue-700 w-6 h-6">
                        
                    </FaUser>
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
            <LogoutButton>
                <DropdownMenuItem>
                    <ExitIcon className="h-4 w-4 mr-2 text-destructive"></ExitIcon>
                    Logout
                </DropdownMenuItem>
            </LogoutButton>
        </DropdownMenuContent>
    </DropdownMenu>
}
