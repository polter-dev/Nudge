import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure} from "~/server/api/trpc";

export const queueRouter = createTRPCRouter({
    join: protectedProcedure
    .input(z.object({
        mode: z.enum(["mode1", "mode2"]), //NEEDS TO BE CHANGED TO ACTUAL MODES ONCE FINALIZED
        planned_duration_minutes: z.number().int().positive()
    }))
    .mutation(async ({ ctx, input }) => {
        //CODE FOR JOINING QUEUE GOES HERE

        const currentUser = ctx.userObj; //get the current user that is calling this procedure (more security)
    

    }),
});
