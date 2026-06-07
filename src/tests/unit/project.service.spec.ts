import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
} from "@jest/globals";

import { Types } from "mongoose";

import { projectService } from "@/services/project.service";
import { AppError } from "@/lib/app-error";

import {
  projectRepository,
} from "@/repositories";

import { IProject } from "@/models/Project";

jest.mock("@/repositories", () => ({
  projectRepository: {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockedProjectRepository =
  projectRepository as jest.Mocked<
    typeof projectRepository
  >;

describe("ProjectService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createProject", () => {
    it("should create project", async () => {
      const ownerId =
        new Types.ObjectId();

      mockedProjectRepository.create.mockResolvedValue(
        {
          _id: new Types.ObjectId(),
          name: "Project",
          description: "Description",
          owner: ownerId,
        } as unknown as IProject
      );

      const result =
        await projectService.createProject(
          "Project",
          "Description",
          ownerId
        );

      expect(
        mockedProjectRepository.create
      ).toHaveBeenCalledWith({
        name: "Project",
        description: "Description",
        owner: ownerId,
      });

      expect(result).toBeDefined();
    });
  });

  describe("getProjects", () => {
    it("should return all projects", async () => {
      mockedProjectRepository.findAll.mockResolvedValue(
        []
      );

      const result =
        await projectService.getProjects();

      expect(
        mockedProjectRepository.findAll
      ).toHaveBeenCalledTimes(1);

      expect(Array.isArray(result)).toBe(
        true
      );
    });
  });

  describe("getProjectById", () => {
    it("should return project by id", async () => {
      mockedProjectRepository.findById.mockResolvedValue(
        {
          _id: new Types.ObjectId(),
          name: "Project",
        } as unknown as IProject
      );

      const result =
        await projectService.getProjectById(
          "1"
        );

      expect(
        mockedProjectRepository.findById
      ).toHaveBeenCalledWith("1");

      expect(result).toBeDefined();
    });

    it("should throw project not found", async () => {
      mockedProjectRepository.findById.mockResolvedValue(
        null
      );

      await expect(
        projectService.getProjectById(
          "1"
        )
      ).rejects.toThrow(AppError);

      await expect(
        projectService.getProjectById(
          "1"
        )
      ).rejects.toThrow(
        "Project not found"
      );
    });
  });

  describe("updateProject", () => {
    it("should update project", async () => {
      mockedProjectRepository.update.mockResolvedValue(
        {
          _id: new Types.ObjectId(),
          name: "Updated",
        } as unknown as IProject
      );

      const result =
        await projectService.updateProject(
          "1",
          {
            name: "Updated",
          }
        );

      expect(
        mockedProjectRepository.update
      ).toHaveBeenCalledWith(
        "1",
        {
          name: "Updated",
        }
      );

      expect(result).toBeDefined();
    });

    it("should throw when project not found", async () => {
      mockedProjectRepository.update.mockResolvedValue(
        null
      );

      await expect(
        projectService.updateProject(
          "1",
          {
            name: "Updated",
          }
        )
      ).rejects.toThrow(AppError);

      await expect(
        projectService.updateProject(
          "1",
          {
            name: "Updated",
          }
        )
      ).rejects.toThrow(
        "Project not found"
      );
    });
  });

  describe("deleteProject", () => {
    it("should delete project", async () => {
      mockedProjectRepository.delete.mockResolvedValue(
        {
          _id: new Types.ObjectId(),
        } as unknown as IProject
      );

      const result =
        await projectService.deleteProject(
          "1"
        );

      expect(
        mockedProjectRepository.delete
      ).toHaveBeenCalledWith("1");

      expect(result).toBeDefined();
    });

    it("should throw when project not found", async () => {
      mockedProjectRepository.delete.mockResolvedValue(
        null
      );

      await expect(
        projectService.deleteProject(
          "1"
        )
      ).rejects.toThrow(AppError);

      await expect(
        projectService.deleteProject(
          "1"
        )
      ).rejects.toThrow(
        "Project not found"
      );
    });
  });
});