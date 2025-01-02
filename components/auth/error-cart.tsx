import { Header } from "./header"
import { BackButton } from "./backButton"
import { Card,CardFooter,CardHeader } from "../ui/card"
export function ErrorCart(){
    return <Card className="w-[400px] shadow-md">
        <CardHeader>
            <Header label="Oops! something went wrong " iserror></Header>
        </CardHeader>
        <CardFooter>
            <BackButton label="<-- Back to login" href="/auth/login"></BackButton>
        </CardFooter>
    </Card>
}