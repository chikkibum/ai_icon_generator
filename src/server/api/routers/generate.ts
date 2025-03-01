import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import OpenAI from "openai";
import { env } from "@/env.mjs";
import { b64Image } from "@/data/b64Image";

const openai = new OpenAI({
  apiKey: env.DALLE_API_KEY,
});

async function generateIcon(prompt: string, numberOfIcons = 1) {
  if (env.MOCK_DALLE === "true") {
    return new Array<string>(numberOfIcons).fill(b64Image);
  } else {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "a white siamese cat",
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    return response.data.map((result) => result.b64_json || "");
  }
}

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
