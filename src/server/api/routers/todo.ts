import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";


export const todoRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany();
  }),
  createTodo: privateProcedure.input(z.object({
    text: z.string().min(1).max(255),
  })).mutation(async({ctx, input}) => {
    const userId = ctx.userId;

    const todo = await ctx.prisma.todo.create({
      data : {
        userId,
        text: input.text
      }
    });
    return todo;
  }),
  editTodo: privateProcedure.input(z.object({
    id: z.string(),
    data: z.object({
      text: z.string().min(1).max(255)
    })
  })
  ).mutation(async ({ctx, input}) => {
    const { id, data } = input;
    const todo = await ctx.prisma.todo.update({
      where: { id },
      data,
    })
    return todo;
  })
});
