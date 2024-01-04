import { request } from "./common";

export async function searchTag(
  k: string
): Promise<{ k: string; tags: string[] }> {
  return request("/api/search/searchTag", { k: k });
}
