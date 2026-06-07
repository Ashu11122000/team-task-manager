import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
} from "@jest/globals";

import { taskService } from "@/services/task.service";
import { AppError } from "@/lib/app-error";

import {
  taskRepository,
} from "@/repositories";

import { ITask } from "@/models/Task";

jest.mock("@/repositories", () => ({
  taskRepository: {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    assignTask: jest.fn(),
    updateStatus: jest.fn(),
  },
}));

const mockedTaskRepository =
  taskRepository as jest.Mocked<
    typeof taskRepository
  >;

describe("TaskService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createTask", () => {
    it("should create task", async () => {
      mockedTaskRepository.create.mockResolvedValue(
        {
          _id: "1",
          title: "Task",
        } as unknown as ITask
      );

      const result =
        await taskService.createTask({
          title: "Task",
          description: "Desc",
          projectId:
            "507f1f77bcf86cd799439011",
          assignedTo:
            "507f1f77bcf86cd799439012",
        });

      expect(
        mockedTaskRepository.create
      ).toHaveBeenCalledTimes(1);

      expect(result).toBeDefined();
    });
  });

  describe("getTasks", () => {
    it("should return all tasks", async () => {
      mockedTaskRepository.findAll.mockResolvedValue(
        []
      );

      const result =
        await taskService.getTasks();

      expect(
        mockedTaskRepository.findAll
      ).toHaveBeenCalledTimes(1);

      expect(Array.isArray(result)).toBe(
        true
      );
    });
  });

  describe("getTaskById", () => {
    it("should return task", async () => {
      mockedTaskRepository.findById.mockResolvedValue(
        {
          _id: "1",
        } as unknown as ITask
      );

      const result =
        await taskService.getTaskById(
          "1"
        );

      expect(
        mockedTaskRepository.findById
      ).toHaveBeenCalledWith("1");

      expect(result).toBeDefined();
    });

    it("should throw task not found", async () => {
      mockedTaskRepository.findById.mockResolvedValue(
        null
      );

      await expect(
        taskService.getTaskById("1")
      ).rejects.toThrow(AppError);

      await expect(
        taskService.getTaskById("1")
      ).rejects.toThrow(
        "Task not found"
      );
    });
  });

  describe("updateTask", () => {
    it("should update task", async () => {
      mockedTaskRepository.update.mockResolvedValue(
        {
          _id: "1",
          title: "Updated",
        } as unknown as ITask
      );

      const result =
        await taskService.updateTask(
          "1",
          {
            title: "Updated",
          }
        );

      expect(
        mockedTaskRepository.update
      ).toHaveBeenCalledWith(
        "1",
        expect.objectContaining({
          title: "Updated",
        })
      );

      expect(result).toBeDefined();
    });

    it("should throw when task not found", async () => {
      mockedTaskRepository.update.mockResolvedValue(
        null
      );

      await expect(
        taskService.updateTask(
          "1",
          {
            title: "Updated",
          }
        )
      ).rejects.toThrow(AppError);

      await expect(
        taskService.updateTask(
          "1",
          {
            title: "Updated",
          }
        )
      ).rejects.toThrow(
        "Task not found"
      );
    });
  });

  describe("assignTask", () => {
    it("should assign task", async () => {
      mockedTaskRepository.assignTask.mockResolvedValue(
        {
          _id: "1",
        } as unknown as ITask
      );

      const result =
        await taskService.assignTask(
          "1",
          "507f1f77bcf86cd799439011"
        );

      expect(
        mockedTaskRepository.assignTask
      ).toHaveBeenCalledTimes(1);

      expect(result).toBeDefined();
    });

    it("should throw when task not found", async () => {
      mockedTaskRepository.assignTask.mockResolvedValue(
        null
      );

      await expect(
        taskService.assignTask(
          "1",
          "507f1f77bcf86cd799439011"
        )
      ).rejects.toThrow(AppError);

      await expect(
        taskService.assignTask(
          "1",
          "507f1f77bcf86cd799439011"
        )
      ).rejects.toThrow(
        "Task not found"
      );
    });
  });

  describe("updateTaskStatus", () => {
    it("should update status", async () => {
      mockedTaskRepository.updateStatus.mockResolvedValue(
        {
          _id: "1",
          status: "DONE",
        } as unknown as ITask
      );

      const result =
        await taskService.updateTaskStatus(
          "1",
          "DONE"
        );

      expect(
        mockedTaskRepository.updateStatus
      ).toHaveBeenCalledWith(
        "1",
        "DONE"
      );

      expect(result).toBeDefined();
    });

    it("should throw when task not found", async () => {
      mockedTaskRepository.updateStatus.mockResolvedValue(
        null
      );

      await expect(
        taskService.updateTaskStatus(
          "1",
          "DONE"
        )
      ).rejects.toThrow(AppError);

      await expect(
        taskService.updateTaskStatus(
          "1",
          "DONE"
        )
      ).rejects.toThrow(
        "Task not found"
      );
    });
  });

  describe("deleteTask", () => {
    it("should delete task", async () => {
      mockedTaskRepository.delete.mockResolvedValue(
        {
          _id: "1",
        } as unknown as ITask
      );

      const result =
        await taskService.deleteTask(
          "1"
        );

      expect(
        mockedTaskRepository.delete
      ).toHaveBeenCalledWith("1");

      expect(result).toBeDefined();
    });

    it("should throw when task not found", async () => {
      mockedTaskRepository.delete.mockResolvedValue(
        null
      );

      await expect(
        taskService.deleteTask("1")
      ).rejects.toThrow(AppError);

      await expect(
        taskService.deleteTask("1")
      ).rejects.toThrow(
        "Task not found"
      );
    });
  });
});