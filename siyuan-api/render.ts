import { BlockId } from "../types/siyuan-api";
import { request } from "./common";

/**
 * @returns
 */
export async function renderSprig(data: { template: string }): Promise<string> {
  return request("/api/template/renderSprig", data);
}

export async function render(data: {
  id: BlockId;
  path: string;
}): Promise<{ content: string; path: string }> {
  return request("/api/template/render", data);
}
