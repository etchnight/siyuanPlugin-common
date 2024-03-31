import { IOperation } from "siyuan";
import { BlockId } from "../types/siyuan-api";
import { getBlockAttrs, setBlockAttrs } from "./attr";
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

type DataType = "markdown" | "dom";

type Transaction = {
  timestamp: number,
  doOperations: IOperation[];
  undoOperations: null;
};

export async function insertBlock(data: {
  dataType: DataType;
  data: string;
  nextID?: BlockId;
  previousID?: BlockId;
  parentID?: BlockId;
}): Promise<IOperation[]> {
  if (!data.nextID && !data.previousID && !data.parentID) {
    console.error(`insertBlock缺少参数id`);
  }
  return request("/api/block/insertBlock", data);
}

/**
 * 更新块一般会丢失所有属性，注意获取和更新属性
 */
export async function updateBlock(data: {
  dataType: DataType;
  data: string;
  id: string;
}): Promise<Transaction[]> {
  return request("/api/block/updateBlock", data);
}

/**
 * 更新块的同时保留属性
 */
export async function updateBlockWithAttr(data: {
  dataType: DataType;
  data: string;
  id: string;
}): Promise<Transaction[]> {
  const attr = await getBlockAttrs(data.id);
  const result = await updateBlock(data);
  await setBlockAttrs({
    id: data.id,
    attrs: attr,
  });
  return result;
}

export async function deleteBlock(data: {
  id: string;
}): Promise<Transaction[]> {
  return request("/api/block/deleteBlock", data);
}

/**
 *
 * @param parentID 父块的 ID，用于锚定插入位置，previousID 和 parentID 不能同时为空，同时存在的话优先使用 previousID
 */
export async function moveBlock(data: {
  id: string;
  previousID: string;
  parentID: string;
}): Promise<Transaction[]> {
  if (!data.previousID && !data.parentID) {
    console.error(`moveBlock缺少参数id`);
  }
  return request("/api/block/moveBlock", data);
}
