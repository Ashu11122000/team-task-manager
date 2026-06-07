import { NextApiRequest, NextApiResponse } from "next";

import { connectDB } from "@/config/database";
import { AuthController } from "@/controllers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  return AuthController.register(req, res);
}