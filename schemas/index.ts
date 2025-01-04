import { UserRole } from "@prisma/client"
import * as z from "zod"

export const LoginSchemas = z.object({
    email:z.string().email(),
    password:z.string().min(1,{
        message:"Password is Required"
    }),
    FAcode:z.optional(z.string())
})

export const RegisterSchema = z.object({
    email:z.string().email(),
    name:z.string().min(1,{
        message:"Name is required"
    }),
    password:z.string().min(6,{
        message:"Minimum 6 characters required"
    })
})

export const ResetSchema = z.object({
    email:z.string().email()
})

export const NewPasswordSchema = z.object({
    password:z.string().min(6,{
        message:"Minimum 6 characters required"
    })
})

export const SettingsSchema = z.object({
    name:z.optional(z.string()),
    isTwoFactorEnable:z.optional(z.boolean()),
    role:z.enum([UserRole.ADMIN,UserRole.USER]),
    email:z.optional(z.string().email()),
    password:z.optional(z.string()),
    newPassword:z.optional(z.string().min(6))
}).refine((data)=>{
    if(data.password && !data.newPassword){return false}
    return true
},{
    message:"New Password is required",
    path:["newPassword"]   
}).refine((data)=>{
    if(!data.password && data.newPassword){return false}
    return true
},{
    message:"Password is required",
    path:["Password"]   
})