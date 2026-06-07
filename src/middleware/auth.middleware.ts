import { NextApiResponse } from "next";

import { verifyToken } from "@/lib/jwt";
import { errorResponse } from "@/lib/api-response";

import { AuthenticatedRequest } from "@/types/api.types";

type JwtPayload = {
  userId: string;
  role: string;
};

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json(
        errorResponse(
          "Authorization header missing"
        )
      );
    }

    const token =
      authHeader.replace(
        "Bearer ",
        ""
      );

    const decoded =
      verifyToken(
        token
      ) as JwtPayload;

    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch {
    return res.status(401).json(
      errorResponse(
        "Invalid or expired token"
      )
    );
  }
};