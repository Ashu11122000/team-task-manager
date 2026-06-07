import type { NextApiRequest, NextApiResponse } from "next";

import { connectDB } from "@/config/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectDB();

    return res.status(200).json({
        success: true,
        message: "Database connected",
    });
}