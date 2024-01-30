import { DocumentId, BlockId } from "../types/siyuan-api";
import { request } from "./common";

interface IResdoOperations {
  doOperations: doOperation[];
  undoOperations: doOperation[] | null;
}

type doOperation = {
  action: string;
  data: string;
  id: BlockId;
  parentID: BlockId | DocumentId;
  previousID: BlockId;
  retData: null;
};

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

type DataType = "markdown" | "dom";
export async function insertBlock(data: {
  dataType: DataType;
  data: string;
  nextID?: BlockId;
  previousID?: BlockId;
  parentID?: BlockId;
}): Promise<IResdoOperations[]> {
  if (!data.nextID && !data.previousID && !data.parentID) {
    console.error(`insertBlock缺少参数id`);
  }
  return request("/api/block/insertBlock", data);
}
