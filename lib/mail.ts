import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const senderEmail = process.env.EMAIL_ADDRESS||""

export async function sendPasswordResetEmail(email:string,token:string) {
    const ResetLink = `${process.env.SERVER_ADDRESS}/auth/new-password?token=${token}`
    resend.emails.send({
        from:senderEmail,
        to:email,
        subject:"Reset Your Password",
        html:`<p><a href="${ResetLink}">Click Here To Reset Your password</a></p>`
    })
}

export const sendVerificationEmail = async(email:string , token:string)=>{
    const confirmLink = `${process.env.SERVER_ADDRESS}/auth/new-verification?token=${token}`
    
    await resend.emails.send({
        
        from:senderEmail,
        to:email,
        subject:"Confirm Your Email",
        html:`<p><a href="${confirmLink}">Click Here To Confirm Your Mail</a></p>`
    })
}

export async function sendTwoFactorVerificationEmail(email:string , token:string){
    await resend.emails.send({
        from:senderEmail,
        to:email,
        subject:"Two Factor Verification Code",
        html:`<p>Your Serect Code is ${token}</p>`
    })
}