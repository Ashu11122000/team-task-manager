import { NextApiResponse } from "next";

import { connectDB } from "@/config/database";
import { TaskController } from "@/controllers";

import { authMiddleware } from "@/middleware/auth.middleware";
import { roleMiddleware } from "@/middleware/role.middleware";
import { runMiddleware } from "@/middleware/run-middleware";

import { AuthenticatedRequest } from "@/types/api.types";

export default async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  await connectDB();

  try {
    switch (req.method) {
      case "GET":
        await runMiddleware(
          req,
          res,
          authMiddleware
        );

        return TaskController.getById(
          req,
          res
        );

      case "PUT":
        await runMiddleware(
          req,
          res,
          authMiddleware
        );

        await runMiddleware(
          req,
          res,
          roleMiddleware("ADMIN")
        );

        return TaskController.update(
          req,
          res
        );

      case "DELETE":
        await runMiddleware(
          req,
          res,
          authMiddleware
        );

        await runMiddleware(
          req,
          res,
          roleMiddleware("ADMIN")
        );

        return TaskController.delete(
          req,
          res
        );

      default:
        return res.status(405).json({
          success: false,
          message: "Method Not Allowed",
        });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Internal Server Error",
    });
  }
}