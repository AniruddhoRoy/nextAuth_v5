import { Card ,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/backButton";

interface CardWrapperProps{
    children:React.ReactNode;
    herderLable:string;
    backButtonLable:string;
    backButtonHref:string;
    showSocial?:boolean
}

export function CardWrapper({children,herderLable,backButtonLable,backButtonHref,showSocial}:CardWrapperProps){
return <Card className="w-[400px] shadow-md">
    <CardHeader>
        <Header label={herderLable}>
            
        </Header>
    </CardHeader>
    <CardContent>
    {children}
    </CardContent>
    {showSocial && (
        <div>
            <CardFooter>
                <Social></Social>
            </CardFooter>
        </div>
    )}
    <CardFooter>
        <BackButton label={backButtonLable} href={backButtonHref}></BackButton>
    </CardFooter>
</Card>
}