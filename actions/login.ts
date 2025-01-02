"use server"
import * as z from "zod"
import { LoginSchemas  } from "@/schemas"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { getUserByEmail } from "@/data/user"
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens"
import { sendTwoFactorVerificationEmail, sendVerificationEmail } from "@/lib/mail"
import { getTwofactorTokenByEmail } from "@/data/twoFactorToken"
import { db } from "@/lib/db"
import { getTwofactorConfirmationByUserId } from "@/data/two_factor_confirmation"

export const login =async (values:z.infer<typeof LoginSchemas>)=>{
    const validatedField = LoginSchemas.safeParse(values)
    if(!validatedField.success)
    {
        return {error:"Invalid Fields"}
    }
    const {email,password , FAcode} = validatedField.data;

    const existingUser = await getUserByEmail(email)

    if(!existingUser || !existingUser.email || !existingUser.password)
    {
        return {error:"Invalid Credentials"}
    }
    if(!existingUser.emailVerified){
        const verificationToken = generateVerificationToken(existingUser.email)
        await sendVerificationEmail((await verificationToken).email,(await verificationToken).token)
        return {success:"Confirmation Email Sent"}
    }
    if(existingUser.isTwoFactorEnable && existingUser.email)
    {   if(FAcode){
            const existing2FA = await getTwofactorTokenByEmail(existingUser.email)
            if(!existing2FA){
                return {error :"Invalid Code!"}
            }
            if(existing2FA.token !== FAcode)
            {
                return {error:"Invalid Code"}
            }
            const hasexpire = new Date(existing2FA.expire) < new Date();
            if(hasexpire){
                return {error :"Code Expires !"}
            }
            await db.twoFactorToken.delete({
                where:{
                    id:existing2FA.id
                }
            })
            const existingConfirmation = await getTwofactorConfirmationByUserId(existingUser.id)
            if(existingConfirmation)
            {
                await db.twoFactorConfirmation.delete({
                    where:{
                        id:existingConfirmation.id
                    }
                })
            }
            await db.twoFactorConfirmation.create({
                data:{
                    userId:existingUser.id
                }
            })
    }else{
        const twoFactorToken = await generateTwoFactorToken(existingUser.email)
        await sendTwoFactorVerificationEmail(twoFactorToken.email,twoFactorToken.token)
        return {twoFactor : true}
    }
    }
    try{
        await signIn("credentials",{
            email,
            password,
            redirectTo:DEFAULT_LOGIN_REDIRECT
        })
    }catch(error){
        if(error instanceof AuthError)
        {
            switch(error.type)
            {
                case "CredentialsSignin":return {error:"Invalid Credentials"}
                default:
                    return {error :"Something went wrong"}
            }
        }
        throw error
    }
    
}

