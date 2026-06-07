import { NextApiRequest, NextApiResponse } from "next";

import { connectDB } from "@/config/database";
import { ProjectController } from "@/controllers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  try {
    switch (req.method) {
      case "GET":
        return await ProjectController.getAll(
          req,
          res
        );

      case "POST":
        return res.status(501).json({
          success: false,
          message:
            "JWT Authentication middleware not implemented yet",
        });

      default:
        return res.status(405).json({
          success: false,
          message: "Method Not Allowed",
        });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error
        ? error.message
        : "Internal Server Error",
    });
  }
}