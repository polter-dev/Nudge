/*
handles the requests when a user creates an acc, logs in, logs out etc
using supabase
*/
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
    signup: publicProcedure
    .input(z.object({ 
        firstName: z.string(), 
        lastName: z.string(),
        userName: z.string(),
        email: z.string(),
        password: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
        //TODO: call supabase to create user and profile
        return /*supa base function */({
            data: {
            firstName: input.firstName, 
            lastName: input.lastName,
            userName: input.userName,
            email: input.email,
            password: input.password
            },
        }); 
    })
});