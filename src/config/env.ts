export const env = {
  MONGODB_URI: process.env.MONGODB_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  NODE_ENV: process.env.NODE_ENV || "development",
};

if (!env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

if (!env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}