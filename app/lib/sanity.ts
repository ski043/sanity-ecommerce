import { createClient } from "@sanity/client";

const projectId = "t0swi8h7";
const dataset = "production";
const apiVersion = "2023-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
