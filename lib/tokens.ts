import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { db } from "./db"
import {v4 as uuidv4} from "uuid"
import crypto from "crypto"
import { getTwofactorTokenByEmail } from "@/data/twoFactorToken";
export const generateVerificationToken= async (email:string)=>{

    const token = uuidv4();
    const expire = new Date(new Date().getTime()+3600*1000);
    const existingToken =await getVerificationTokenByEmail(email);
    if(existingToken){
        await db.verificationToken.deleteMany({
            where:{
                email
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data:{
            email,
            token,
            expire
        }
    })
    return verificationToken
}

export async function generatePasswordResetToken(email:string){
    const token = uuidv4();
    const expire = new Date(new Date().getTime()+3600*1000);
    const existingToken = await db.passwordResetToken.findFirst({
        where:{
            email
        }
    })
    if(existingToken){
        await db.passwordResetToken.deleteMany({
            where:{
                email
            }
        })
    }
    const passwordResetToken = await db.passwordResetToken.create({
        data:{
            email,
            expire,
            token
        }
    })

    return passwordResetToken
}

export async function generateTwoFactorToken(email:string) {
    const token = crypto.randomInt(100_000,1_000_000).toString();
    const expire = new Date(new Date().getTime()+3600*1000);
    
    const existingToken = await getTwofactorTokenByEmail(email)
    if(existingToken)
    {
        await db.twoFactorToken.deleteMany({
            where:{
                email
            }
        })
    }
    const twoFactorToken = await db.twoFactorToken.create({
        data:{
            email,
            token,
            expire
        }
    })
    return twoFactorToken
}