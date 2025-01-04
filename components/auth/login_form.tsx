"use client"
import { CardWrapper } from "@/components/auth/CardWrapper";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form ,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form";
import * as z from "zod";
import {LoginSchemas} from "@/schemas"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { Suspense, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
export function LoginForm (){
     return <Suspense>
        <LoginForm1></LoginForm1>
     </Suspense>
}
export function LoginForm1(){
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error")==="OAuthAccountNotLinked"?"Email already in used with different provider":"";

    const [showTwoFA , setTwoFA] = useState(false)
    const [isPending,startTransition] = useTransition();
    const [error,setError] = useState<string|undefined>("");
    const [success,setSuccess] = useState<string|undefined>("");
    const form = useForm<z.infer<typeof LoginSchemas>>({
        resolver:zodResolver(LoginSchemas),
        defaultValues:{
            email:"",
            password:"",
            FAcode:""
        }
    });

    const onSubmit = (values:z.infer<typeof LoginSchemas>)=>{
        startTransition(()=>{
            login(values).then((data)=>{
                    if(data?.error){
                        form.reset()
                        setError(data.error)
                    }
                    if(data?.success){
                        form.reset()
                        setSuccess(data.success)
                    }
                    if(data?.twoFactor){
                        setTwoFA(true)
                    }
            }).catch(()=>{
                setError("Something Went Wrong")
            })
        })
    }

    return <CardWrapper herderLable="Welcome Back" backButtonLable="Don't Have an account ?" backButtonHref="/auth/register"
    showSocial>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    {showTwoFA && <>
                        <FormField control={form.control} name="FAcode" render={({field})=>(
                        <FormItem>
                            <FormLabel>2 FAcode</FormLabel>
                            <FormControl>
                            <Input {...field} disabled={isPending} placeholder="123456"></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}/>
                    </>
                    }
                   {!showTwoFA && <>
                    <FormField control={form.control} name="email" render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                            <Input {...field} disabled={isPending} placeholder="email@example.com"></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}/>

                    <FormField control={form.control} name="password" render={({field})=>(
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                            <Input {...field} disabled={isPending} placeholder="Enter your password"></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}/>

                        </>}
                </div>
                   {!showTwoFA &&<Button variant="link" size="sm" asChild className="px-0 font-normal">
                        <Link href="/auth/reset">  Forgot Password ?</Link>
                    </Button>}
                <FormError message={error||urlError}/>
                <FormSuccess message={success}/>
                    <Button type="submit" disabled={isPending} className="w-full">
                        {showTwoFA?"SUBMIT":"LOGIN"}
                    </Button>
            </form>
        </Form>
    </CardWrapper>
}