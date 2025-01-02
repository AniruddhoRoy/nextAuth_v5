"use client"
import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./CardWrapper"
import {RiseLoader} from "react-spinners"
import { useCallback, useEffect, useState } from "react"
import { NewVerification } from "@/actions/new-verification"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
export const NewVerificationForm = ()=>{
    const [error,setError] = useState<string|undefined>("")
    const [success,setSuccess] = useState<string|undefined>("")
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
   
    const onSubmit = useCallback(()=>{
        if(!token)
            {
                setError("Missing Token")
                return null ;
            }
        NewVerification(token).then((data)=>{
                setError(data.error)
                setSuccess(data.success)
        }).catch(()=>{
            setError("Something Went Wrong")
        })
    },[token])
    useEffect(()=>{
        onSubmit();
    },[onSubmit])
    return <CardWrapper herderLable="Confirming Your Verification" backButtonHref="/auth/login" backButtonLable="Back To Login">
        <div className="flex justify-center items-center w-full flex-col">
        {!error && !success && (<RiseLoader/>)}
        <FormError message={error}/>
        <FormSuccess message={success}/>
        </div>
        </CardWrapper>
}