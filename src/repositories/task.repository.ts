import { Task, ITask } from "@/models/Task";

export class TaskRepository {
  async create(taskData: Partial<ITask>): Promise<ITask> {
    return await Task.create(taskData);
  }

  async findAll(): Promise<ITask[]> {
    return await Task.find().populate("projectId").populate("assignedTo");
  }

  async findById(taskId: string): Promise<ITask | null> {
    return await Task.findById(taskId)
      .populate("projectId")
      .populate("assignedTo");
  }

  async update(taskId: string, data: Partial<ITask>): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(taskId, data, { new: true });
  }

  async delete(taskId: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(taskId);
  }

  async assignTask(
    taskId: string,
    assignedTo: ITask["assignedTo"],
  ): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(taskId, { assignedTo }, { new: true });
  }

  async updateStatus(taskId: string, status: string): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(taskId, { status }, { new: true });
  }
}
