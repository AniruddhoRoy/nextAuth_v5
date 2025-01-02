import { UserInfo } from "@/components/user_info"
import { CurrentUser } from "@/lib/auth"

export default async function HOME(){
    const user = await CurrentUser()
    return <UserInfo label="Server Components" user={user}/>
}