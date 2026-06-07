import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { RegisterSchema } from "@/validators/auth_validator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result =
    RegisterSchema.safeParse({
      name: "Ashish",
      email: "ashish@gmail.com",
      password: "123456",
    });

  return res.status(200).json(result);
}