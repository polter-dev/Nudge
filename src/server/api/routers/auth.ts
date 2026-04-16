import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const userSelect = {
  id: true,
  firstName: true,
  lastName: true,
  userName: true,
  email: true,
  authenticated: true,
  university: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        userName: z
          .string()
          .min(5, "Username must be at least 5 characters")
          .regex(
            /^[a-zA-Z][a-zA-Z0-9]{4,}$/,
            "Username must start with a letter and contain only letters and numbers",
          ),
        email: z
          .string()
          .email("Must be a valid email")
          .refine((e) => e.toLowerCase().endsWith(".edu"), {
            message: "Must be a .edu email address",
          }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingEmail = await ctx.db.user.findUnique({
        where: { email: input.email.toLowerCase() },
      });
      if (existingEmail) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "An account with this email already exists",
        });
      }

      const existingUsername = await ctx.db.user.findUnique({
        where: { userName: input.userName },
      });
      if (existingUsername) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "That username is already taken",
        });
      }

      return ctx.db.user.create({
        data: {
          microsoftId: `pending-${Date.now()}`,
          firstName: input.firstName,
          lastName: input.lastName,
          userName: input.userName,
          email: input.email.toLowerCase(),
          authenticated: false,
        },
        select: userSelect,
      });
    }),

  getUser: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
        select: {
          ...userSelect,
          sessions: {
            orderBy: { createdAt: "desc" },
            take: 10,
          },
        },
      });

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      return user;
    }),

  updateProfile: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        userName: z
          .string()
          .min(5, "Username must be at least 5 characters")
          .regex(
            /^[a-zA-Z][a-zA-Z0-9]{4,}$/,
            "Username must start with a letter and contain only letters and numbers",
          )
          .optional(),
        university: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, ...updates } = input;

      if (updates.userName) {
        const existing = await ctx.db.user.findFirst({
          where: { userName: updates.userName, NOT: { email } },
        });
        if (existing) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "That username is already taken",
          });
        }
      }

      return ctx.db.user.update({
        where: { email },
        data: updates,
        select: userSelect,
      });
    }),
});
