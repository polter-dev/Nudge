/* 
    TO DO:
    Ask if we want to track when they joined the queue and how long they were in the queue for analytics purposes
    Potentially add a procedure to get the current queue status or the user's position in the queue
*/

import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure} from "~/server/api/trpc";

export const queueRouter = createTRPCRouter({
    join: protectedProcedure
    .input(z.object({
        //mode will be duo for queue because solo users can just create a session without joining the queue
        planned_duration_minutes: z.number().int().positive()
    }))
    .mutation(async ({ ctx, input }) => {

        const currentUser = ctx.userObj; //accessing user form the context

        //make sure user is not already in the queue - maybeSingle will return null if no entry is found instead of throwing an error, which is what we want in this case
        const {data: queueEntry, error} = await ctx.supabase
            .from('live_queue')
            .select('id')
            .eq('user_id', currentUser.id) 
            .maybeSingle(); 
        
        //handle potential error from supabase query
        if (queueEntry) {
            console.log("User is already in the queue with entry:", queueEntry);
            throw new Error("User is already in the queue");
        }


        const {error: joinError} = await ctx.supabase
            .from('live_queue')
            .insert({
                user_id: currentUser.id,
                planned_duration_minutes: input.planned_duration_minutes,
                entered_at: new Date().toISOString() // assuming you want to track when they joined
                // NOTE: If you want to track time use current time minus entered_at to calculate how long they've been in the queue.
            });

            if (joinError) {
                console.error("Error joining queue:", joinError);
                throw new Error("Failed to join queue");
            }


        return { message: "Successfully joined the queue" }

    }),

    leave: protectedProcedure
    .input(z.object({

        //potentially need some input to identify which queue or session they want to leave if there are multiple types

    }))
    .mutation(async ({ ctx, input }) => {
        const currentUser = ctx.userObj; //accessing user form the context

        const {error} = await ctx.supabase
            .from('live_queue')
            .delete()
            .eq('user_id', currentUser.id); //assuming user can only be in one queue at a time
            
        if (error) {
            console.error("Error leaving queue:", error);
            throw new Error("Failed to leave queue");
        }

        return { message: "Successfully left the queue" }
    }),

});
