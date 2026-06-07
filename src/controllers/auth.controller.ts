import { NextApiRequest, NextApiResponse } from "next";

import { authService } from "@/services/auth.service";

import { validate } from "@/lib/validate";
import {
  successResponse,
  errorResponse,
} from "@/lib/api-response";

import {
  RegisterSchema,
  LoginSchema,
} from "@/validators/auth_validator";

type AuthRequest = NextApiRequest & {
  user: {
    id: string;
  };
};

export class AuthController {
  static async register(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const parsed = validate(RegisterSchema, req.body);

    if (!parsed.success) {
      return res.status(400).json(
        errorResponse(
          parsed.error.issues[0]?.message ||
            "Validation failed"
        )
      );
    }

    const user = await authService.register(
      parsed.data.name,
      parsed.data.email,
      parsed.data.password
    );

    return res.status(201).json(
      successResponse(
        user,
        "User registered successfully"
      )
    );
  }

  static async login(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const parsed = validate(LoginSchema, req.body);

    if (!parsed.success) {
      return res.status(400).json(
        errorResponse(
          parsed.error.issues[0]?.message ||
            "Validation failed"
        )
      );
    }

    const result = await authService.login(
      parsed.data.email,
      parsed.data.password
    );

    return res.status(200).json(
      successResponse(
        result,
        "Login successful"
      )
    );
  }

  static async profile(
    req: AuthRequest,
    res: NextApiResponse
  ) {
    const user = await authService.profile(
      req.user.id
    );

    return res.status(200).json(
      successResponse(
        user,
        "Profile fetched successfully"
      )
    );
  }
}