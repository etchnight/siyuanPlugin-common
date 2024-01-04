import { BlockId } from "../types/siyuan-api";
import { request } from "./common";

export async function getParentNextChildID(id: BlockId): Promise<BlockId> {
  return request("/api/block/getParentNextChildID", {
    id: id,
  });
}
