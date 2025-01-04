import { UserRole } from "@prisma/client";
import NextAuth , {DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] &{
    role:UserRole,
    isTwoFactorEnable:boolean,
    isOAuth:boolean
}
declare module "next-auth"{
    interface Session{
        user:ExtendedUser
    }
}