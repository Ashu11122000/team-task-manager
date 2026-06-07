import { NextApiRequest, NextApiResponse } from "next";

import { taskService } from "@/services/task.service";

import { validate } from "@/lib/validate";

import {
  successResponse,
  errorResponse,
} from "@/lib/api-response";

import {
  CreateTaskSchema,
  UpdateTaskSchema,
  AssignTaskSchema,
} from "@/validators/task_validator";

import { UpdateTaskStatusSchema } from "@/validators/task-status.validator";

export class TaskController {
  static async create(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const parsed = validate(
      CreateTaskSchema,
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

    const task =
      await taskService.createTask(
        parsed.data
      );

    return res.status(201).json(
      successResponse(
        task,
        "Task created successfully"
      )
    );
  }

  static async getAll(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const tasks =
      await taskService.getTasks();

    return res.status(200).json(
      successResponse(
        tasks,
        "Tasks fetched successfully"
      )
    );
  }

  static async getById(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { id } = req.query;

    const task =
      await taskService.getTaskById(
        id as string
      );

    return res.status(200).json(
      successResponse(
        task,
        "Task fetched successfully"
      )
    );
  }

  static async update(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const parsed = validate(
      UpdateTaskSchema,
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

    const task =
      await taskService.updateTask(
        id as string,
        parsed.data
      );

    return res.status(200).json(
      successResponse(
        task,
        "Task updated successfully"
      )
    );
  }

  static async delete(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { id } = req.query;

    const task =
      await taskService.deleteTask(
        id as string
      );

    return res.status(200).json(
      successResponse(
        task,
        "Task deleted successfully"
      )
    );
  }

  static async assign(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parsed = validate(
    AssignTaskSchema,
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

  const task =
    await taskService.assignTask(
      id as string,
      parsed.data.assignedTo
    );

  return res.status(200).json(
    successResponse(
      task,
      "Task assigned successfully"
    )
  );
}

static async updateStatus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parsed = validate(
    UpdateTaskStatusSchema,
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

  const task =
    await taskService.updateTaskStatus(
      id as string,
      parsed.data.status
    );

  return res.status(200).json(
    successResponse(
      task,
      "Task status updated successfully"
    )
  );
}
}