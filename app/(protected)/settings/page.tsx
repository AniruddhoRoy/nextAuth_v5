"use client"

import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react"
import { toast } from "sonner";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas";
import {Form,FormField,FormControl,FormItem,FormLabel,FormDescription,FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@prisma/client";
import { Switch } from "@/components/ui/switch";

export default function Home(){
    const {update} = useSession()
    const [ispending,startTransition] = useTransition();
    // const [error ,setError] = useState<string | undefined>()
    // const [success ,setSuccess] = useState<string | undefined>()
    const user = useCurrentUser()
    function Onsubmit(values:z.infer<typeof SettingsSchema>){
        startTransition(()=>{
            settings(values).then((data)=>{
                if(data.success){
                    toast.success(data.success)
                    update()
                }
                if(data.error){
                    toast.error(data.error)
                }
            }).catch(()=>{
                toast.error("Something Went Wrong1")
            })
        })
    }
    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver:zodResolver(SettingsSchema),
        defaultValues:{
            name:user?.name||undefined,
            email:user?.email || undefined,
            password:undefined,
            newPassword:undefined,
            role:user?.role||undefined,
            isTwoFactorEnable:user?.isTwoFactorEnable||undefined
        }
    })
    return <Card className="w-[600px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Settings
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(Onsubmit)}>
                    <div className="space-y-4">

                    <FormField 
                        control={form.control}
                        name="name"
                        render = {({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                    placeholder="You  Name"
                                    disabled={ispending}
                                    ></Input>
                                </FormControl>
                                <FormMessage>

                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    {user?.isOAuth===false && <>
                    
                        <FormField 
                        control={form.control}
                        name="email"
                        render = {({field})=>(
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                    placeholder="email@example.com"
                                    disabled={ispending}
                                    type="email"
                                    ></Input>
                                </FormControl>
                                <FormMessage>
                                    
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="password"
                        render = {({field})=>(
                            <FormItem>
                                <FormLabel>Old Password</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                    placeholder="******"
                                    disabled={ispending}
                                    type="password"
                                    ></Input>
                                </FormControl>
                                <FormMessage>
                                    
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="newPassword"
                        render = {({field})=>(
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                    placeholder="******"
                                    disabled={ispending}
                                    type="password"
                                    ></Input>
                                </FormControl>
                                <FormMessage>
                                    
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    
                    </>}
                    
                    <FormField 
                        control={form.control}
                        name="role"
                        render = {({field})=>(
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select disabled={ispending} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Role">

                                                </SelectValue>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={UserRole.ADMIN}>
                                                            Admin
                                            </SelectItem>
                                            <SelectItem value={UserRole.USER}>
                                                            User
                                            </SelectItem>
                                        </SelectContent>
                                </Select>
                                <FormMessage>
                                    
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    {user?.isOAuth===false && <>
                    
                        <FormField 
                        control={form.control}
                        name="isTwoFactorEnable"
                        render = {({field})=>(
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-1">
                                    <FormLabel>
                                        Two Factor Authentication
                                    </FormLabel>
                                    <FormDescription>
                                        Enable Two factor authentication
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch disabled={ispending} checked={field.value} onCheckedChange={field.onChange}>
                                    </Switch>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    </>}
                    </div>
                        <Button type="submit">Save</Button>
                    </form>
                </Form>
            </CardContent>

    </Card>
}