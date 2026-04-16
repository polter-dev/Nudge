/*
handles the requests when a user creates an acc, logs in, logs out etc
using supabase
*/
import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { supabaseAdmin } from "~/server/supabase";

export const authRouter = createTRPCRouter({
    signup: publicProcedure
    .input(z.object({ 
        firstName: z.string(), 
        lastName: z.string(),
        userName: z.string(),
        email: z.string().email().refine((email) => email.endsWith(".edu")),
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
       // Uses admin client to bypass RLS (no INSERT policy on profiles)
       const { error: profileError } = await supabaseAdmin
           .from('profiles')
           .insert({
                id: res.data.user.id,
                username: input.userName,
                first_name: input.firstName,
                last_name: input.lastName,
                email: input.email,
                is_student: false, // set to false since it needs to be auth'd
                university: null,
                created_at: res.data.user.created_at, // this may not work, not entirely sure
                updated_at: res.data.user.updated_at // same thing for this
           })

       if (profileError) {
           // Clean up orphaned auth user if profile insert fails
           const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(res.data.user.id);
           if (deleteError) {
               console.error(`Failed to clean up orphaned auth user ${res.data.user.id}:`, deleteError);
           }
           throw new TRPCError({
               code: "INTERNAL_SERVER_ERROR",
               message: "Creating Profile Failed",
           });
       }

       return {success: true, userId: res.data.user.id}
    }),

    login: publicProcedure
    .input(z.object({
        email: z.string().email().refine((email) => email.endsWith(".edu")),
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

    forgotPasswordByEmail: publicProcedure
    .input(z.object({
        email:z.string().email().refine((email) => email.endsWith(".edu"))
    }))
    .mutation(async({ ctx, input }) => {
        const res = await ctx.supabase.auth.resetPasswordForEmail(input.email, {
            redirectTo: 'https://example.com/update-password' 
        }) /* THIS NEEDS TO BE UPDATED ONCE THE DOMAIN IS PUBLISHED*/
        if (res.error)
            throw new Error("Something Went Wrong!");

        return {success: true};
    })
});
