"use server"

import { getPasswordResetTokenByToken } from "@/data/password_reset_token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs"

export async function NewPassword(values:z.infer<typeof NewPasswordSchema> , token?:string|null) {
    if(!token)
    {
        return {error:"Token Missing"}
    }
    const validatedField = NewPasswordSchema.safeParse(values)
    if(!validatedField.success)
    {
        return {error:"Invalid Field"}
    }
    const existingToken = await getPasswordResetTokenByToken(token)
    if(!existingToken)
    {
        return {error:"Invalid Token"}
    }
    const hasExpire = new Date(existingToken.expire)< new Date()
    if(hasExpire)
    {
        return {error:"Token Expire !"}
    }
    const existingUser =await getUserByEmail(existingToken.email)
    if(!existingUser)
    {
        return {error:"User Not Exist"}
    }
    const hashedPassword = await bcrypt.hash(validatedField.data.password,10);
    await db.user.update({
        where:{
            email:existingToken.email
        },
        data:{
            password:hashedPassword
        }
    })
    await db.passwordResetToken.delete({
        where:{
            id:existingToken.id
        }
    })
    return {success:"Password Updated"}
}