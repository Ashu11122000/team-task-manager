import { NextApiRequest, NextApiResponse } from "next";

import { AuthenticatedRequest } from "@/types/api.types";

export const loggerMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const start = Date.now();

  const originalEnd = res.end.bind(res) as typeof res.end;

  res.end = ((chunk?: string | Buffer | Uint8Array, encoding?: BufferEncoding | (() => void), cb?: () => void): NextApiResponse => {
    const duration = Date.now() - start;

    const userId =
      (req as AuthenticatedRequest).user?.id ?? "anonymous";

    console.log(
      JSON.stringify({
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        userId,
        timestamp: new Date().toISOString(),
      })
    );

    if (typeof encoding === "function") {
      cb = encoding;
      encoding = undefined;
    }

    if (encoding !== undefined) {
      return originalEnd(chunk, encoding, cb);
    }

    return originalEnd(chunk, cb);
  }) as typeof res.end;

  next();
};