/*
handles procedures for creating, joining, and ending study sessions
*/

//lots of questions pertaining to the function of sesssion before continuing
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const sessionsRouter = createTRPCRouter({
    create: publicProcedure
    .input(z.object({ 
        mode: z.string(), //could potentially change to z.enum(["mode1", "mode2"])
        status: z.string(), //could potentially change to z.enum(["status1", "status2"])
        planned_duration_minutes: z.number().int().positive(),
        started_at: z.date(),

        /*id (UUID): Your database handles generating unique IDs
          same with created_at and ended_at should be generated
        */
    }))
    
    .mutation(async ({ ctx, input }) => {
        /*
        TO DO:
        - Call supabase and insert rows into sessions table
        - Save id to be used to creat session participants row
        */
    }),

    end: publicProcedure
    .input(z.object({ 
        sessionID: z.string() //aka sessionId either depending on final rable
    }))

    .mutation(async ({ ctx, input }) => {
        /*
        TO DO:
        - Does this happen once both users leave?
        - Update 'sessions' table
            - Change status and ended_at variables for said session
        */
    }),

    /*
    join: publicProcedure
    .input(z.object({ 
        sessionID: z.string() //aka sessionId either depending on final rable
    }))
    
    .mutation(async ({ ctx, input }) => {
        
        TO DO:
        - Verify the user is allowed to join this session or that it is not already full
        - Update session_participants 'user_id' document when user joins
        
    })
    */

    leave: publicProcedure
    .input(z.object({ 
        particpantID: z.string() //the user thats leaving id
    }))
    
    .mutation(async ({ ctx, input }) => {
        /*
        TO DO:
        - set left_at time in session_participants
        */
    })
    
});