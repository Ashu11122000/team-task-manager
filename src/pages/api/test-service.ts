import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { connectDB } from "@/config/database";

import { projectService } from "@/services/project.service";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const projects =
    await projectService.getProjects();

  return res.status(200).json({
    success: true,
    count: projects.length,
  });
}