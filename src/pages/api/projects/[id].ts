import { NextApiResponse } from "next";

import { connectDB } from "@/config/database";
import { ProjectController } from "@/controllers";

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

        return ProjectController.getById(
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

        return ProjectController.update(
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

        return ProjectController.delete(
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