import { NextApiResponse } from "next";

import { errorResponse } from "@/lib/api-response";

import { AuthenticatedRequest } from "@/types/api.types";

export const roleMiddleware =
  (...roles: string[]) =>
  (
    req: AuthenticatedRequest,
    res: NextApiResponse,
    next: () => void
  ) => {
    if (!req.user) {
      return res.status(401).json(
        errorResponse("Unauthorized")
      );
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json(
        errorResponse("Access denied")
      );
    }

    next();
  };