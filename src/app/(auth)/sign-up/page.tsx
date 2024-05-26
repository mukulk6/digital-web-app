"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/src/components/Icons";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { AuthCrediantialsValidator, TAuthCrediantialsValidator } from "@/src/lib/validators/account-credentials-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {trpc} from "../../../trpc/client";
import {toast} from"sonner";
import { ZodError } from "zod";
// import { router } from "@/src/trpc/trpc";
import { useRouter, useSearchParams } from "next/navigation";


const Page = () => {

    const searchParams = useSearchParams()
    const {register,handleSubmit,formState:{errors}} = useForm<TAuthCrediantialsValidator>({resolver:zodResolver(AuthCrediantialsValidator)})
    const router = useRouter()
    const isSeller = searchParams.get('as') === 'seller'
    const continueAsSeller = ()=> {
        router.push("?as=seller")
    }
    const continueAsBuyer = ()=>{
        router.replace('/sign-in',undefined)
    }
    const origin = searchParams.get('origin')
    const {mutate:signIn,isLoading} = trpc.auth.signIn.useMutation({
        onSuccess:() =>{
            toast.success('Signed In Successfully')
            router.refresh()
            if(origin)
                {
                    router.push(`/${origin}`)
                    return
                }
            if(isSeller)
                {
                    router.push('/sell')
                    return
                }
            router.push('/')
        },
        onError:(err)=>{
            if(err.data?.code === 'UNAUTHORIZED')
                {toast.error("Invalid Email")}
        }
    })
    

    const onSubmit = ({email,password}:TAuthCrediantialsValidator) =>{
        signIn({email,password})
    }
    return(
        <>
        <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20"></Icons.logo>
            <h1 className="text-2x1 font-bold">
                Sign in to your {isSeller ? "seller" : ''}
            </h1>
            <Link className={buttonVariants({variant:'link',className:"gap-1.5"})} href='/sign-in'>
                Already have an account? Sign-in
                <ArrowRight className="h-4 w-4" />
            </Link>
            </div>
            <div className="grid gap-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1 py-2">
                            <Label htmlFor="email">Email</Label>
                            <Input {...register("email")} placeholder="you@axample.com" className={cn({"focus-visible:ring-red-500":errors.email})}/>
                            {errors?.email && (<p className="text-sm text-red-500">{errors.email.message}</p>)}
                        </div>
                        <div className="grid gap-1 py-2">
                            <Label htmlFor="password">Password</Label>
                            <Input type='password' {...register('password')} placeholder="Password" className={cn({"focus-visible:ring-red-500":errors.password})}/>
                            {errors?.password && (<p className="text-sm text-red-500">{errors.password.message}</p>)}
                        </div>
                        <Button>Sign In</Button>
                    </div>
                </form>
                <div className = "relative">
                    <div aria-hidden='true' className = 'absolute inset-0 flex items-center'>
                        <span className='w-full border-t'></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 text-muted-foreground bg-background">or</span>
                    </div>
                </div>
                {isSeller ? (
                    <Button onClick={continueAsBuyer} variant={'secondary'} disabled={isLoading}>Continue as Customer</Button>) :
                    <Button  onClick={continueAsSeller} variant={'secondary'} disabled={isLoading}>
                    Continue
                    </Button>
                }
            </div>
            </div >
        </div>
        </>
    )
}

export default Page;        