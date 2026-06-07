import { NextApiRequest, NextApiResponse } from "next";

import { connectDB } from "@/config/database";
import { ProjectController } from "@/controllers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case "GET":
      return ProjectController.getById(
        req,
        res
      );

    case "PUT":
      return ProjectController.update(
        req,
        res
      );

    case "DELETE":
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
}