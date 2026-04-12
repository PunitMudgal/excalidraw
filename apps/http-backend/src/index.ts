import express from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {
  CreateUserSchema,
  SignInSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/database/client";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.post("/signup", async (req: Request, res: Response) => {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ message: data.error.message });
  }
  try {
    const user = await prismaClient.user.create({
      data: {
        email: data.data.email,
        username: data.data.username,
        password: data.data.password,
        name: data.data.name,
      },
    });
    res.json({ message: "User signed up" });
  } catch (error) {
    res.status(500).json({ message: "User already exists", error });
  }
});

app.post("/signin", (req: Request, res: Response) => {
  const data = SignInSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ message: data.error.message });
  }

  res.json({ message: "User signed in" });
});

app.post("/createroom", middleware, (req: Request, res: Response) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ message: data.error.message });
  }

  res.json({ message: "Room created", roomId: 123 });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
