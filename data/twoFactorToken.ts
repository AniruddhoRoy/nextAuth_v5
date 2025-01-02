import { db } from "@/lib/db";

export async function getTwofactorTokenByToken(token:string) {
   try{
    const twoFactorToken = await db.twoFactorToken.findFirst({
        where:{
            token
        }
    })
    return twoFactorToken
   }catch{
    return null
   }
}

export async function getTwofactorTokenByEmail(email:string) {
    try{
     const twoFactorToken = await db.twoFactorToken.findFirst({
         where:{
            email
         }
     })
     return twoFactorToken
    }catch{
     return null
    }
 }