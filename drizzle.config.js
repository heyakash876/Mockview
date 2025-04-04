import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url:"postgresql://mockingdb_owner:npg_Ti5z3odSvxLN@ep-twilight-thunder-a8hpuixj-pooler.eastus2.azure.neon.tech/mockingdb?sslmode=require",
  }
});
