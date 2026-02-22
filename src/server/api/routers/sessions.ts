/*
handles procedures for creating, joining, and ending study sessions
*/
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const sessionsRouter = createTRPCRouter({
    create: publicProcedure
    .input(z.object({ 
        mode: z.boolean(), 
        status: z.boolean(),
        planned_duration_minutes: z.number(),
        created_at: z.date(), //reasoning for both timestamp needs to be confirmed
        started_at: z.date(),
        ended_at: z.date(),
        id: z.string()
    }))
    
    .mutation(async ({ ctx, input }) => {
        /*
        TO DO:
        call supabase and insert rows into sessions table
        */
    }),

    end: publicProcedure
    .input(z.object({ 
        id: z.string() //aka sessionId either depending on final rable
    }))

    .mutation(async ({ ctx, input }) => {
        /*
        TO DO:
        call supabase and insert rows into sessions table
        */
    }),

    join: publicProcedure
    .input(z.object({ 
        id: z.string() //aka sessionId either depending on final rable
    }))

    .mutation(async ({ ctx, input }) => {
        /*
        TO DO:
        call supabase and insert rows into sessions table
        */
    })
});