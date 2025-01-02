import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"
import { getTwofactorConfirmationByUserId } from "./data/two_factor_confirmation"
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages:{
    signIn:"/auth/login",
    error:"/auth/error"
  },
  events:{
    async linkAccount({user}){
      await db.user.update({
        where:{
          id:user.id,
        },
        data:{
          emailVerified:new Date()
        }
      })
    }
  },
  callbacks:{
    async signIn({user,account}){
      if(account?.provider != "credentials")
      {
        return true;
      }
      if(!user.id)
      {
        return false
      }
      const existingUser =await getUserById(user.id)
      if(!existingUser || !existingUser.emailVerified)
      {
        return false
      }
      if(existingUser.isTwoFactorEnable)
      {
        const twoFactorConfirmation = await getTwofactorConfirmationByUserId(existingUser.id)
        if(!twoFactorConfirmation){
          return false
        }
        await db.twoFactorConfirmation.delete({
          where:{
            id:twoFactorConfirmation.id
          }
        })
      }
      return true
    },
    async session({token,session}){
     if(token.sub && session.user){
      session.user.id = token.sub 
     }
     if(token.role && session.user)
     {
      session.user.role = token.role as UserRole
     }
      return session
    },
    async jwt({token}){
      if(token.sub)
      {
        const user = await getUserById(token.sub)
        if(user){
          token.role = user.role
        }
      }
      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})
