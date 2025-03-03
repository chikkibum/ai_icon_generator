import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { env } from "@/env.mjs";
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: "ap-south-1",
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
  },
});

async function generateIcon(prompt: string, numberOfIcons = 1) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning`,
    {
      headers: {
        Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ prompt }),
    }
  );

  if (!response.ok) {
    throw new Error(`Cloudflare AI request failed: ${response.statusText}`);
  }

  // Convert response to binary data (image)
  const arrayBuffer = await response.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");

  return `data:image/jpeg;base64,${base64Image}`;
}

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log(input.prompt);

      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session?.user.id,
          credits: { gte: 1 },
        },
        data: {
          credits: { decrement: 1 },
        },
      });

      if (count === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Not enough credits",
        });
      }

      const base64Image = await generateIcon(input.prompt);

      await s3.putObject({
        Bucket: env.S3_BUCKET_NAME,
        Key: `icons/${ctx.session?.user.id}/${Date.now()}.jpeg`,
        Body: Buffer.from(base64Image, "base64"),
        ContentType: "image/jpeg",
      });

      return {
        message: "success",
        result: { imageBase64: base64Image },
      };
    }),
});
