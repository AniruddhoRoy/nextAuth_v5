import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button";
import { NavBar } from "../_components/navbar";
export default async function Home(){
    return <>
    <NavBar></NavBar>
        <Button type="submit" variant="destructive">
            Sign Out
        </Button>
    </>
}