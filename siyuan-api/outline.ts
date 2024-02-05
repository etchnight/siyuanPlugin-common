import { BlockTree, BlockId } from "../types/siyuan-api";
import { request } from "./common";

export type DocOutline = {
  id?: string;
  box?: string;
  name?: string;
  hPath?: string;
  type?: string;
  nodeType?: string;
  subType?: string;
  blocks?: Array<BlockTree>;
  depth?: number;
  count?: number;
  updated?: string;
  created?: string;
};
export const getDocOutline = async (id: BlockId): Promise<DocOutline> => {
  return request("/api/outline/getDocOutline", {
    id: id,
  });
};
