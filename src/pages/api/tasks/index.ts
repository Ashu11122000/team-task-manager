import { NextApiResponse } from "next";

import { connectDB } from "@/config/database";
import { TaskController } from "@/controllers";

import { authMiddleware } from "@/middleware/auth.middleware";
import { roleMiddleware } from "@/middleware/role.middleware";
import { runMiddleware } from "@/middleware/run-middleware";

import { AuthenticatedRequest } from "@/types/api.types";

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *
 *   post:
 *     summary: Create task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - projectId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Implement JWT Authentication
 *               description:
 *                 type: string
 *                 example: Add login and registration flow
 *               projectId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               assignedTo:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439012
 *     responses:
 *       201:
 *         description: Task created
 *       403:
 *         description: Admin access required
 */
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

        return TaskController.getAll(
          req,
          res
        );

      case "POST":
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

        return TaskController.create(
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