import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8),
  name: z.string().min(3),
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3),
});
