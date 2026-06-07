import {
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";

import {
  createMocks,
} from "node-mocks-http";

import registerHandler
  from "@/pages/api/auth/register";

import loginHandler
  from "@/pages/api/auth/login";

jest.mock(
  "@/config/database",
  () => ({
    connectDB: jest.fn(),
  })
);

describe(
  "Auth API",
  () => {
    it(
      "should reject GET register",
      async () => {
        const { req, res } =
          createMocks({
            method: "GET",
          });

        await registerHandler(
          req,
          res
        );

        expect(
          res._getStatusCode()
        ).toBe(405);
      }
    );

    it(
      "should reject GET login",
      async () => {
        const { req, res } =
          createMocks({
            method: "GET",
          });

        await loginHandler(
          req,
          res
        );

        expect(
          res._getStatusCode()
        ).toBe(405);
      }
    );
  }
);