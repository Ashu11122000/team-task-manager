import {
    Project,
    IProject,
} from "@/models/Project";

export class ProjectRepository {
    async create(
        projectData: Partial<IProject>
    ): Promise<IProject> {
        return await Project.create(
            projectData
        );
    }

    async findAll(): Promise<IProject[]> {
        return await Project.find()
            .populate("owner");
    }

    async findById(
        projectId: string
    ): Promise<IProject | null> {
        return await Project.findById(
            projectId
        ).populate("owner");
    }

    async update(
        projectId: string,
        data: Partial<IProject>
    ): Promise<IProject | null> {
        return await Project.findByIdAndUpdate(
            projectId,
            data,
            { new: true }
        );
    }

    async delete(
        projectId: string
    ): Promise<IProject | null> {
        return await Project.findByIdAndDelete(
            projectId
        );
    }
}