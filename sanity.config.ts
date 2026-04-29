import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { postSchema } from "./sanity/schemas/post";
import { newsPostSchema } from "./sanity/schemas/newsPost";

export default defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [structureTool()],
  schema: {
    types: [postSchema, newsPostSchema],
  },
  title: "XenReality Studio",
});
