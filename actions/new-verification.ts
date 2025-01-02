"use server"

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken"
import { db } from "@/lib/db";

export async function NewVerification(token:string) {
    const existingToken =await getVerificationTokenByToken(token)
    if(!existingToken)
    {
        return {error:"Token Does not exist!"}
    }
    const hasExpired = new Date(existingToken.expire)<new Date();
    if(hasExpired)
    {
        return {error:"Token Has expired!"}
    }
    const existingUser =await getUserByEmail(existingToken.email);
    if(!existingUser)
    {
        return {error:"Email Does not Exist"}
    }
    await db.user.update({
        where:{
            id:existingUser.id
        },
        data:{
            email:existingToken.email,
            emailVerified:new Date()
        }
    })

    await db.verificationToken.delete({
        where:{
            id:existingToken.id
        }
    })

    return {success:"Email Verified"}
}