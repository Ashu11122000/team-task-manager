import { NextApiResponse } from "next";

import { connectDB } from "@/config/database";
import { ProjectController } from "@/controllers";

import { authMiddleware } from "@/middleware/auth.middleware";
import { roleMiddleware } from "@/middleware/role.middleware";
import { runMiddleware } from "@/middleware/run-middleware";

import { AuthenticatedRequest } from "@/types/api.types";

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     summary: Create project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: E-Commerce Platform
 *               description:
 *                 type: string
 *                 example: Backend project for team management
 *     responses:
 *       201:
 *         description: Project created
 *       401:
 *         description: Unauthorized
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

        if (!req.user) {
          return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const authedReq = req as AuthenticatedRequest & { user: { id: string } };

        return ProjectController.getAll(
          authedReq,
          res
        );

      case "POST":
        await runMiddleware(
          req,
          res,
          authMiddleware
        );

        if (!req.user) {
          return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        await runMiddleware(
          req,
          res,
          roleMiddleware("ADMIN")
        );

        const authedReqPost = req as AuthenticatedRequest & { user: { id: string } };

        return ProjectController.create(
          authedReqPost,
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