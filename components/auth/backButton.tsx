import { Button } from "@/components/ui/button";
import Link from "next/link";

export function BackButton({label,href}:{label:string,href:string}){
    return <div className="flex items-center justify-center w-full">
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
            <Link href={href}>{label}</Link>
        </Button>
    </div>
}