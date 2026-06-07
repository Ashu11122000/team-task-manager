import { NextApiRequest, NextApiResponse } from "next";
import { Types } from "mongoose";

import { projectService } from "@/services/project.service";

import { validate } from "@/lib/validate";
import {
  successResponse,
  errorResponse,
} from "@/lib/api-response";

import { CreateProjectSchema, UpdateProjectSchema } from "@/validators/project_validator";
type AuthRequest = NextApiRequest & {
  user: {
    id: string;
  };
};

export class ProjectController {
  static async create(
    req: AuthRequest,
    res: NextApiResponse
  ) {
    const parsed = validate(
      CreateProjectSchema,
      req.body
    );

    if (!parsed.success) {
      return res.status(400).json(
        errorResponse(
          parsed.error.issues[0]?.message ||
            "Validation failed"
        )
      );
    }

    const project =
      await projectService.createProject(
        parsed.data.name,
        parsed.data.description,
        new Types.ObjectId(req.user.id)
      );

    return res.status(201).json(
      successResponse(
        project,
        "Project created successfully"
      )
    );
  }

  static async getAll(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const projects =
      await projectService.getProjects();

    return res.status(200).json(
      successResponse(
        projects,
        "Projects fetched successfully"
      )
    );
  }

  static async getById(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { id } = req.query;

    const project =
      await projectService.getProjectById(
        id as string
      );

    return res.status(200).json(
      successResponse(
        project,
        "Project fetched successfully"
      )
    );
  }

  static async update(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const parsed = validate(
      UpdateProjectSchema,
      req.body
    );

    if (!parsed.success) {
      return res.status(400).json(
        errorResponse(
          parsed.error.issues[0]?.message ||
            "Validation failed"
        )
      );
    }

    const { id } = req.query;

    const project =
      await projectService.updateProject(
        id as string,
        parsed.data
      );

    return res.status(200).json(
      successResponse(
        project,
        "Project updated successfully"
      )
    );
  }

  static async delete(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { id } = req.query;

    const project =
      await projectService.deleteProject(
        id as string
      );

    return res.status(200).json(
      successResponse(
        project,
        "Project deleted successfully"
      )
    );
  }
}