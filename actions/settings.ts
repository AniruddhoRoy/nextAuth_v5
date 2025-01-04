"use server"

import * as z from "zod"

import { SettingsSchema } from "@/schemas"
import { CurrentUser } from "@/lib/auth"
import { getUserByEmail, getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import bcrypt from "bcryptjs"

export const settings =async (values:z.infer<typeof SettingsSchema>)=>{
    const varidated_values = SettingsSchema.safeParse(values)
    if(!varidated_values.success){
        return {error:"Invalid Fields"}
    }
    console.log(varidated_values.data)
   const user = await CurrentUser(); 
   if(!user || !user.id){
    return {error:"Unauthorized"}
   }
   const dbUser = await getUserById(user.id)
   if(!dbUser){
    return {error:"Unauthorized"}
   }
   if(user.isOAuth)
   {
    varidated_values.data.email = undefined
    varidated_values.data.password = undefined
    varidated_values.data.newPassword = undefined
    varidated_values.data.isTwoFactorEnable = undefined
   }
   if(varidated_values.data.email && varidated_values.data.email!== user.email)
   {
    const existingUser = await getUserByEmail(varidated_values.data.email)
    if(existingUser && existingUser.id !== user.id)
    {
        return {error:"Email is in use !"}
    }
        const verificationToken = await  generateVerificationToken(varidated_values.data.email)
        await sendVerificationEmail(varidated_values.data.email,verificationToken.token)
        return {success : "Verificatrion Email send"}
   }

   if(varidated_values.data.password && varidated_values.data.newPassword && dbUser.password){
    const passwordMatch = await bcrypt.compare(varidated_values.data.password,dbUser.password)
    if(!passwordMatch){
        return {error : "Password doesn't Match !"}
    }
    const hashedPassword =await bcrypt.hash(varidated_values.data.newPassword,10);
    varidated_values.data.password = hashedPassword
    varidated_values.data.newPassword = undefined
   }
//    console.log(varidated_values.data)
//    const updatedData = varidated_values.data

try {
    await db.user.update({
      where: { id: dbUser.id },
      data: {...varidated_values.data},
    });
    return { success: "Profile updated successfully." };
  } catch (error) {
    //   console.error("Database update failed:", error);
      return { error: "An error occurred while updating your profile." };
  }
}