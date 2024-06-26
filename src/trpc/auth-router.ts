import { TRPCError } from "@trpc/server"
import { getPayloadClient } from "../get-payload"
import { AuthCrediantialsValidator } from "../lib/validators/account-credentials-validators"
import {router,publicProcedure} from "./trpc"
import {z} from "zod"
export const authRouter = router({
    createPayloadUser:publicProcedure.input(AuthCrediantialsValidator).mutation(async ({input})=>{
        const {email,password} = input
        const payload = await getPayloadClient();

        const {docs:users} = await payload.find({
            collection:"users",
            where:{
                email:{
                    equals:email
                }
            }
        })
        if(users.length !== 0) throw new TRPCError({code:'CONFLICT'})

        await payload.create({
            collection:"users",
            data:{
             email,
             password,
             role:"user"  
            }
        })
        return {success:true,sentToEmail:email}
    }),
    verifyEmail:publicProcedure.input(z.object({token:z.string()})).query(async({input})=>{
        const {token} = input
        const payload = await getPayloadClient()
        const isVerfied = await payload.verifyEmail({
            collection:'users',
            token
        })
        if(!isVerfied) throw new TRPCError({code:'UNAUTHORIZED'})
        return {success : true}
       
    }),
    signIn:publicProcedure.input(AuthCrediantialsValidator).mutation(async ({input,ctx})=>{
        const {email,password} = input
        const {res} = ctx;
        const payload = await getPayloadClient()
        try
        {
            await payload.login({
                collection:'users',
                data:{
                    email,
                    password
                }
            })
        }catch(err){
            throw new TRPCError({code:'UNAUTHORIZED'})
        }
    })
})