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