import { auth } from "@/auth";

export async function CurrentUser(){
    const session = await auth()

    return session?.user
}