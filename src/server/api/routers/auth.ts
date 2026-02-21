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
        const res = await ctx.supabase.auth.signUp({
            email: input.email,
            password: input.password
        })
        if (res.error)
            throw new Error("Signup Failed")

        /*
        TO DO:
        call supabase and insert rows into profiles table
        */
    })
});