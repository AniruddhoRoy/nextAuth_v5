interface HerderProps{
    label:string;
    iserror?:boolean;

}

export function Header({label , iserror}:HerderProps){
    return <div className="w-full flex flex-col gap-y-4 items-center justify-center">
<h1 className="text-3xl font-semibold">
🔏 Auth
</h1>
{iserror?<p className="text-muted-foreground text-sm text-red-600">
    {label}
</p>:<p className="text-muted-foreground text-sm">
    {label}
</p>}
    </div>
}