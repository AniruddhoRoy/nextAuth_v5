interface FormErrorProps{
    message?:string
};

export function FormSuccess({message}:FormErrorProps){
    if(!message){
        return null;
    }
    return <div className="flex w-full justify-center items-center border-green-500 border-2 rounded-sm py-1 text-green-500 font-semibold">
        {message}
    </div>
}