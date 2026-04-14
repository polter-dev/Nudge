/*
handles the requests when a user creates an acc, logs in, logs out etc
using supabase
*/
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

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

        if (res.error || !res.data.user)
            throw new Error("Signup Failed")


       // access user id -> res.data.user.id;
       const { error: profileError } = await ctx.supabase 
       .from('profiles')
       .insert({
            id: res.data.user.id,
            username: input.userName,
            first_name: input.firstName,
            last_name: input.lastName,
            email: input.email,
            is_student: false, // set to false since it needs to be auth'd
            university: null,
            //created_at: res.data.user.created_at, // this may not work, not entirely sure
            //updated_at: res.data.user.updated_at // same thing for this 
       })
       if (profileError)
            throw new Error("Creating Profile Failed")

       return {success: true, userId: res.data.user.id}
    }),

    login: publicProcedure
    .input(z.object({
        email: z.string().email(),
        password: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
        const res = await ctx.supabase.auth.signInWithPassword({
            email: input.email,
            password: input.password
        });

        if (res.error || !res.data.user)
            throw new Error("Login Failed");

        return { success: true, userId: res.data.user.id };
    }),

    logout: protectedProcedure
    .mutation(async({ ctx }) => {
        const res = await ctx.supabase.auth.signOut()

        if (res.error)
            throw new Error("No valid user session!");

        return {success: true, confirmation: "Signed Out"};
    }),

    getSecretMessage: protectedProcedure.query(({ ctx }) => {
        // Because this uses protectedProcedure, ctx.userObj is guaranteed to exist!
        return {
            message: `Success! You are authenticated as ${ctx.userObj.email}`,
            userId: ctx.userObj.id,
        };
    }),

});
