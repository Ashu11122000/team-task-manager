import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { connectDB } from "@/config/database";

import { User } from "@/models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectDB();

    const users = await User.find();

    return res.status(200).json({
        success: true,
        count: users.length,
    });
}