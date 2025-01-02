export default function ProtectedLayout({children}:{children:React.ReactNode}){
    return <div className="h-full flex flex-col gap-y-5 items-center justify-center bg-sky-500">
        {children}
    </div>

}