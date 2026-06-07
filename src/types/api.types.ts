import { NextApiRequest } from "next";

export interface AuthenticatedRequest
  extends NextApiRequest {
  user: {
    id: string;
    role: string;
  };
}