import { NextApiResponse } from "next";

import { AuthenticatedRequest } from "@/types/api.types";

export const runMiddleware = (
  req: AuthenticatedRequest,
  res: NextApiResponse,
  fn: (
    req: AuthenticatedRequest,
    res: NextApiResponse,
    next: (result?: unknown) => void
  ) => void
) => {
  return new Promise<void>(
    (resolve, reject) => {
      fn(req, res, (result?: unknown) => {
        if (result instanceof Error) {
          return reject(result);
        }

        resolve();
      });
    }
  );
};