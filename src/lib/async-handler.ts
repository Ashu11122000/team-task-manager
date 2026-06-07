import { NextApiHandler } from "next";

export const asyncHandler =
  (handler: NextApiHandler): NextApiHandler =>
  async (req, res) => {
    try {
      return await handler(req, res);
    } catch (error) {
      throw error;
    }
  };