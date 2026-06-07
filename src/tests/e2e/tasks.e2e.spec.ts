import {
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";

import {
  createMocks,
} from "node-mocks-http";

import taskHandler
  from "@/pages/api/tasks";

jest.mock(
  "@/config/database",
  () => ({
    connectDB: jest.fn(),
  })
);

describe(
  "Tasks API",
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

        await taskHandler(
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