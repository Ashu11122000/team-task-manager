import type {
    NextApiRequest,
    NextApiResponse,
} from "next";

import { connectDB } from "@/config/database";

import {
    userRepository,
} from "@/repositories";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectDB();

    const users =
        await userRepository.findAll();

    return res.status(200).json({
        success: true,
        count: users.length,
    });
}