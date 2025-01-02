import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps{
    user?:ExtendedUser
    label:string
}
export const UserInfo = ({user,label}:UserInfoProps)=>{
    return <Card className="w-[600px] shadow-md">
        <CardHeader>
            <p className="text-2xl font-semibold text-center">
                {label}
            </p>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-semibold">ID</p>
            <p className="text-sm font-semibold">{user?.id}</p>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-semibold">User Name</p>
            <p className="text-sm font-semibold">{user?.name}</p>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-semibold">Email</p>
            <p className="text-sm font-semibold">{user?.email}</p>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-semibold">Role</p>
            <p className="text-sm font-semibold">{user?.role}</p>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-semibold">Two Factor Authentication</p>
            <Badge variant={user?.isTwoFactorEnable?"success":"destructive"} className="text-sm font-semibold">{user?.isTwoFactorEnable?"ON":"OFF"}</Badge>
            </div>
        </CardContent>
        
    </Card>
}