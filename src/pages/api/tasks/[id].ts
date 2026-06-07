import { NextApiRequest, NextApiResponse } from "next";

import { connectDB } from "@/config/database";
import { TaskController } from "@/controllers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case "GET":
      return TaskController.getById(
        req,
        res
      );

    case "PUT":
      return TaskController.update(
        req,
        res
      );

    case "DELETE":
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
}