interface FormErrorProps{
    message?:string
};

export function FormError({message}:FormErrorProps){
    if(!message){
        return null;
    }

    return <div className="flex w-full justify-center items-center border-destructive border-2 rounded-sm py-1 text-red-600 font-semibold">
        {message}
    </div>
}