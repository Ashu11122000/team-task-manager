import mongoose, { Schema, Document, Model } from "mongoose";

import { TaskStatus } from "@/constants/task-status";

export interface ITask extends Document {
    title: string;
    description: string;
    status: TaskStatus;
    projectId: mongoose.Types.ObjectId;
    assignedTo: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: Object.values(TaskStatus),
            default: TaskStatus.TODO,
        },

        projectId: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },

        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Task: Model<ITask> =
    mongoose.models.Task ||
    mongoose.model<ITask>("Task", TaskSchema);