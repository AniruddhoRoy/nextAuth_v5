"use server"
import * as z from "zod"
import {RegisterSchema } from "@/schemas"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
export const register =async (values:z.infer<typeof RegisterSchema>)=>{
    const validatedField = RegisterSchema.safeParse(values)
    if(!validatedField.success)
    {
        return {error:"Invalid Fields"}
    }
    const {name ,email , password} = validatedField.data;
    const hashedPassword = await bcrypt.hash(password,10);
    const userexist = await getUserByEmail(email)
    if(userexist)
    {
        return {error:"Email already taken"}
    }
    await db.user.create({
        data:{
            email:email,
            password:hashedPassword,
            name:name
        }
    })
    const verificationToken =await generateVerificationToken(email);

    await sendVerificationEmail(verificationToken.email,verificationToken.token)
    return {success:"Confirmation Email Sent"}
}
