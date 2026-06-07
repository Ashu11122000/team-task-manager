// src/pages/api/swagger.ts

import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { swaggerSpec } from "@/config/swagger";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(swaggerSpec);
}