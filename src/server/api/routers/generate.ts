import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log(input.prompt);

      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session?.user.id,

          credits: {
            gte: 1,
          },
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });

      if (count === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Not enough credits",
        });
      }
      return {
        message: "success",
        result: {
          prompt: input.prompt,
        },
      };
    }),
});
