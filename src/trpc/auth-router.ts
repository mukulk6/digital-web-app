import { TRPCError } from "@trpc/server"
import { getPayloadClient } from "../get-payload"
import { AuthCrediantialsValidator } from "../lib/validators/account-credentials-validators"
import {router,publicProcedure} from "./trpc"
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
             role:"User"  
            }
        })
        return {success:true,sentToEmail:email}
    })
})