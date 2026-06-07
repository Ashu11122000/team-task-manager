import { Types } from "mongoose";

import { projectRepository } from "@/repositories";
import { AppError } from "@/lib/app-error";

export class ProjectService {
  async createProject(
    name: string,
    description: string,
    owner: Types.ObjectId
  ) {
    return await projectRepository.create({
      name,
      description,
      owner,
    });
  }

  async getProjects() {
    return await projectRepository.findAll();
  }

  async getProjectById(
    projectId: string
  ) {
    const project =
      await projectRepository.findById(
        projectId
      );

    if (!project) {
      throw new AppError(
        "Project not found",
        404
      );
    }

    return project;
  }

  async updateProject(
    projectId: string,
    data: Parameters<
      typeof projectRepository.update
    >[1]
  ) {
    const project =
      await projectRepository.update(
        projectId,
        data
      );

    if (!project) {
      throw new AppError(
        "Project not found",
        404
      );
    }

    return project;
  }

  async deleteProject(
    projectId: string
  ) {
    const project =
      await projectRepository.delete(
        projectId
      );

    if (!project) {
      throw new AppError(
        "Project not found",
        404
      );
    }

    return project;
  }
}

export const projectService =
  new ProjectService();