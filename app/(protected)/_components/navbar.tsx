"use client"

import { UserButton } from "@/components/auth/userButton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
export function NavBar(){
    const pathanme = usePathname()
    return <div className="bg-white flex justify-between items-center w-[600px] rounded-xl p-4 shadow-sm">
        <div className="flex gap-x-2">
        <Button variant={pathanme === "/server"?"default":"outline"} asChild><Link href="/server">Server</Link></Button>
        <Button variant={pathanme === "/client"?"default":"outline"} asChild><Link href="/client">Client</Link></Button>
            <Button variant={pathanme === "/settings"?"default":"outline"} asChild><Link href="/settings">Settings</Link></Button>
            <Button variant={pathanme === "/admin"?"default":"outline"} asChild><Link href="/admin">Admin</Link></Button>
        </div>
        <UserButton>
            
        </UserButton>
    </div>
}