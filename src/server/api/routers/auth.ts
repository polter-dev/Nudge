/*
handles the requests when a user creats an acc, logs in, logs out etc
using supabase
*/
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({})