"use server"

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import { z } from "zod";

export async function ResetPassword(value:z.infer<typeof ResetSchema>){
    const validatedField = ResetSchema.safeParse(value)
    if(!validatedField.success)
    {
        return {error:"Invalid Field"}
    }
    const { email }= validatedField.data
    const existingUser =await getUserByEmail(email)
    if(!existingUser){
        return {error:"Email Not Found"}
    }
    const {token} =await generatePasswordResetToken(email)

    await sendPasswordResetEmail(email,token)

    return {success:"Reset Email sent"}
}