import { db } from "@/lib/db";

export async function getPasswordResetTokenByEmail(email:string){
    try{
        const existingToken = await db.passwordResetToken.findFirst({
            where:{
                email
            }
        })
        if(!existingToken)
        {
            return null
        }
        return existingToken
    }catch{
        return null
    }
}

export async function getPasswordResetTokenByToken(token:string){
    try{
        const existingToken = await db.passwordResetToken.findFirst({
            where:{
                token
            }
        })
        if(!existingToken)
        {
            return null
        }
        return existingToken
    }catch{
        return null
    }
}