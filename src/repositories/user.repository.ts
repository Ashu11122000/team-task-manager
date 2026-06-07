import { User, IUser } from "@/models/User";

export class UserRepository {
    async create(
        userData: Partial<IUser>
    ): Promise<IUser> {
        return await User.create(userData);
    }

    async findByEmail(
        email: string
    ): Promise<IUser | null> {
        return await User.findOne({ email });
    }

    async findById(
        userId: string
    ): Promise<IUser | null> {
        return await User.findById(userId);
    }

    async findAll(): Promise<IUser[]> {
        return await User.find();
    }

    async update(
        userId: string,
        data: Partial<IUser>
    ): Promise<IUser | null> {
        return await User.findByIdAndUpdate(
            userId,
            data,
            { new: true }
        );
    }

    async delete(
        userId: string
    ): Promise<IUser | null> {
        return await User.findByIdAndDelete(
            userId
        );
    }
}