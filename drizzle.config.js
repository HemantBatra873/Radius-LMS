import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:1VqQBdUCO6lf@ep-fancy-sunset-a8sh8ycn.eastus2.azure.neon.tech/neondb?sslmode=require",
  },
});
