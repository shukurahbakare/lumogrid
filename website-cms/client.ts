// lib/sanity.client.ts
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "nfb1ojk8", // replace with your Sanity project ID
  dataset: "production",       // or your dataset name
  apiVersion: "2026-02-01",
  useCdn: false,               // false ensures fresh content
});

export async function getFaqs() {
  const data = await client.fetch(`*[_type == "faq"]`);
  return data;
}