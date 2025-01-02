import { db } from "@/lib/db";

export async function getTwofactorConfirmationByUserId(userId:string){

    try{
        const TwofactorConfirmation = await db.twoFactorConfirmation.findUnique({
            where:{
                userId
            }
        })
        return TwofactorConfirmation
    }
    catch{
        return null
    }
}