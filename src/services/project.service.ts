import {
  projectRepository,
} from "@/repositories";
import { Types } from "mongoose";

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
      throw new Error(
        "Project not found"
      );
    }

    return project;
  }

  async updateProject(
    projectId: string,
    data: Parameters<typeof projectRepository.update>[1]
  ) {
    const project =
      await projectRepository.update(
        projectId,
        data
      );

    if (!project) {
      throw new Error(
        "Project not found"
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
      throw new Error(
        "Project not found"
      );
    }

    return project;
  }
}

export const projectService =
  new ProjectService();