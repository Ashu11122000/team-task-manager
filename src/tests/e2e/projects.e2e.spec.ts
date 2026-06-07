import {
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";

import {
  createMocks,
} from "node-mocks-http";

import handler
  from "@/pages/api/projects";

jest.mock(
  "@/config/database",
  () => ({
    connectDB: jest.fn(),
  })
);

describe(
  "Projects API",
  () => {
    it(
      "should reject unsupported method",
      async () => {
        const {
          req,
          res,
        } = createMocks({
          method: "PATCH",
        });

        await handler(
          req as never,
          res
        );

        expect(
          res._getStatusCode()
        ).toBe(405);
      }
    );
  }
);