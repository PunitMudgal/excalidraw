import express from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {
  CreateUserSchema,
  SignInSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient, Prisma } from "@repo/database/client";

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
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.data.password, saltRounds);

    const user = await prismaClient.user.create({
      data: {
        email: data.data.email,
        username: data.data.username,
        password: hashedPassword,
        name: data.data.name,
      },
    });

    return res.status(201).json({ message: "User signed up successfully" });
  } catch (error: any) {
    // Prisma unique constraint violation → P2002
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const conflictingField = (error.meta?.target as string[])?.[0] ?? "field";
      return res.status(409).json({
        message: `An account already exists for this ${conflictingField}`,
      });
    }

    // Everything else is a genuine server error
    console.error("[POST /signup]", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/signin", async (req: Request, res: Response) => {
  const data = SignInSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ message: data.error.message });
  }

  const { email, password } = data.data;
  const user = await prismaClient.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
  if (!token) {
    return res.status(500).json({ message: "Failed to generate token" });
  }

  res.json({ message: "User signed in", token });
});

app.post("/createroom", middleware, async (req: Request, res: Response) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ message: data.error.message });
  }

  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "userid in req not found!" });
  }

  const room = await prismaClient.room.create({
    data: {
      slug: data.data.name,
      name: data.data.name,
      adminId: userId,
    },
  });

  if (!room) {
    return res.status(500).json({ message: "Failed to create room" });
  }

  res.json({ message: "Room created", name: room.name, id: room.id });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
