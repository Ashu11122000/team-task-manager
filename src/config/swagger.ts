import swaggerJSDoc, {
  Options,
} from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Team Task Manager API",
      version: "1.0.0",
      description:
        "Team Task Manager API Documentation",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "src/pages/api/**/*.ts",
  ],
};

export const swaggerSpec =
  swaggerJSDoc(options);