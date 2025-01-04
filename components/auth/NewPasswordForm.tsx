"use client"
import { CardWrapper } from "@/components/auth/CardWrapper";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form ,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form";
import * as z from "zod";
import {NewPasswordSchema} from "@/schemas"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Suspense, useState, useTransition } from "react";
import { NewPassword } from "@/actions/new-password";
import { useSearchParams } from "next/navigation";
export function NewPasswordForm(){
    return <Suspense>
    <NewPasswordForm1></NewPasswordForm1>
  </Suspense>
}

export function NewPasswordForm1(){
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [isPending,startTransition] = useTransition();
    const [error,setError] = useState<string|undefined>("");
    const [success,setSuccess] = useState<string|undefined>("");
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver:zodResolver(NewPasswordSchema),
        defaultValues:{
            password:""
        }
    });

    const onSubmit = (values:z.infer<typeof NewPasswordSchema>)=>{
        startTransition(()=>{
            NewPassword(values,token).then((data)=>{
                    setError(data?.error)
                    setSuccess(data?.success)
            })
        })
    }

    return <CardWrapper herderLable="Reset Password" backButtonLable="Back To Login" backButtonHref="/auth/login">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField control={form.control} name="password" render={({field})=>(
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                            <Input {...field} disabled={isPending} placeholder="Enter New Password"
                            type="password"
                            ></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}/>
                </div>
                <FormError message={error}/>
                <FormSuccess message={success}/>
                    <Button type="submit" disabled={isPending} className="w-full">
                        Confirm
                    </Button>
            </form>
        </Form>
    </CardWrapper>
}