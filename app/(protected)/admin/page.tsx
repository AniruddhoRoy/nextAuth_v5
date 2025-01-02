"use client"

import { adminFunction } from "@/actions/admin"
import { RoleGate } from "@/components/auth/role_gate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { UseCurrentRole } from "@/hooks/useCurrentRole"
import { UserRole } from "@prisma/client"
import { toast } from "sonner"

export default function Home(){
    function OnApiRouteClick(){
        fetch("/api/admin").then((response)=>{
            if(response.ok){
                toast.success("Allowed api route")
            }
            else{
                toast.error("Forbidden api route")
            }
        })
    }
    function onServerActionClick(){
        adminFunction().then((data)=>{
            if(data.error){
                toast.error(data.error)
            }
            if(data.success){
                toast.success(data.success)
            }
        })
    }
    return <Card className="w-[600px] shadow-md">
        <CardHeader>
        <p className="text-2xl font-semibold text-center">
                Admin Page
            </p>
        </CardHeader>
        <CardContent className="space-y-3">
        <RoleGate allowedRole={UserRole.ADMIN}>
            hello
        </RoleGate>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">
                Admin-only api routes
            </p>
            <Button onClick={OnApiRouteClick}>
            Click here to test
        </Button>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">
                Admin-only server action
            </p>
            <Button onClick={onServerActionClick}>
            Click here to test
        </Button>
        </div>
        </CardContent>
    </Card>
}