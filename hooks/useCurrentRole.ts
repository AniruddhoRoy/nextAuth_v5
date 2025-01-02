import { useSession } from "next-auth/react";

export function UseCurrentRole(){
    const UserRole = useSession()

    return UserRole.data?.user.role
}