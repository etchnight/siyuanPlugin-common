import { BlockId, NodeType } from "../types/siyuan-api";
import { isBlock, request } from "./common";

/**
 *
 * @returns content innerHTML 从块开始（而非编辑器）
 */
export async function getDoc(data: {
  id: BlockId;
  startID?: BlockId;
  endID?: BlockId;
}): Promise<{
  blockCount: number;
  box: string;
  content: string;
  eof: boolean;
  id: string;
  isBacklinkExpand: boolean;
  isSyncing: boolean;
  mode: number;
  parent2ID: string;
  parentID: string;
  path: string;
  rootID: string;
  scroll: boolean;
  type: NodeType;
}> {
  for (let key of Object.keys(data)) {
    if (!isBlock(data[key])) {
      throw `getDoc输入参数${key}不是BlockId!`;
    }
  }
  return request("/api/filetree/getDoc", data);
}
