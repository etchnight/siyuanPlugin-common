import { BlockId } from "../types/siyuan-api";
import { request } from "./common";

/**
 * @description 返回的值不是父级的第一个子块，目前作用未知
 * @param id 
 * @returns 
 */
export async function getParentNextChildID(
  id: BlockId
): Promise<{ id: BlockId }> {
  return request("/api/block/getParentNextChildID", {
    id: id,
  });
}
