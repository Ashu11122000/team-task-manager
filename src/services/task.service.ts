import { ObjectId } from "mongodb";

import { taskRepository } from "@/repositories";
import { AppError } from "@/lib/app-error";

export class TaskService {
  async createTask(data: {
    title: string;
    description: string;
    projectId: string;
    assignedTo: string;
  }) {
    const payload = {
      ...data,
      projectId: new ObjectId(
        data.projectId
      ),
      assignedTo: new ObjectId(
        data.assignedTo
      ),
    };

    return await taskRepository.create(
      payload
    );
  }

  async getTasks() {
    return await taskRepository.findAll();
  }

  async getTaskById(
    taskId: string
  ) {
    const task =
      await taskRepository.findById(
        taskId
      );

    if (!task) {
      throw new AppError(
        "Task not found",
        404
      );
    }

    return task;
  }

  async updateTask(
    taskId: string,
    data: Partial<{
      title: string;
      description: string;
      projectId: string;
      assignedTo: string;
    }>
  ) {
    const payload: Partial<{
      title: string;
      description: string;
      projectId: ObjectId;
      assignedTo: ObjectId;
    }> = {};

    if (data.title !== undefined) {
      payload.title = data.title;
    }

    if (data.description !== undefined) {
      payload.description =
        data.description;
    }

    if (data.projectId) {
      payload.projectId =
        new ObjectId(data.projectId);
    }

    if (data.assignedTo) {
      payload.assignedTo =
        new ObjectId(data.assignedTo);
    }

    const task =
      await taskRepository.update(
        taskId,
        payload
      );

    if (!task) {
      throw new AppError(
        "Task not found",
        404
      );
    }

    return task;
  }

  async deleteTask(
    taskId: string
  ) {
    const task =
      await taskRepository.delete(
        taskId
      );

    if (!task) {
      throw new AppError(
        "Task not found",
        404
      );
    }

    return task;
  }

  async assignTask(
    taskId: string,
    userId: string
  ) {
    const task =
      await taskRepository.assignTask(
        taskId,
        new ObjectId(userId)
      );

    if (!task) {
      throw new AppError(
        "Task not found",
        404
      );
    }

    return task;
  }

  async updateTaskStatus(
    taskId: string,
    status: string
  ) {
    const task =
      await taskRepository.updateStatus(
        taskId,
        status
      );

    if (!task) {
      throw new AppError(
        "Task not found",
        404
      );
    }

    return task;
  }
}

export const taskService =
  new TaskService();