import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Router, Request, Response, json } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "Arun98710"; // Use env variable for the JWT secret
const prismaClient = new PrismaClient();
const router = Router();

router.post("/signin", async (req: Request, res: Express.Response) => {
  // console.log(req, "Req");
  const hardCodedWallet = "jdsnfksaf_nkjndasf_nkjsadfiurkajn";
  const existingUser = await prismaClient.user.findFirst({
    where: {
      adress: hardCodedWallet,
    },
  });

  if (existingUser) {
    const token = jwt.sign({ userId: existingUser.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    // return res.json({ message: "User logged in successfully.", token });
  } else {
    const newUser = await prismaClient.user.create({
      data: {
        adress: hardCodedWallet,
      },
    });
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
  }
});

export default router;
