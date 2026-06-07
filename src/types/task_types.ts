export interface CreateTaskDto {
    title: string;
    description: string;
    projectId: string;
    assignedTo: string;
}