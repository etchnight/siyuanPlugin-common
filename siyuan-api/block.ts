import { IOperation, IProtyle } from "siyuan";
//import { IProtyle } from "../types/global-siyuan";
import { BlockId } from "../types/siyuan-api";
import { getBlockAttrs, setBlockAttrs } from "./attr";
import { request } from "./common";

/**
 * @description 返回的值不是父级的第一个子块，目前作用未知
 * @param id
 * @returns
 */
export async function getParentNextChildID(data: {
  id: BlockId;
}): Promise<{ id: BlockId }> {
  return request("/api/block/getParentNextChildID", {
    id: data.id,
  });
}

type DataType = "markdown" | "dom";

export type TransactionRes = {
  timestamp: number;
  doOperations: IOperation[];
  undoOperations: null;
};

export async function insertBlock(
  data: {
    dataType: DataType;
    data: string;
    nextID?: BlockId;
    previousID?: BlockId;
    parentID?: BlockId;
  },
  protyle?: IProtyle
): Promise<TransactionRes[]> {
  if (!data.nextID && !data.previousID && !data.parentID) {
    console.error(`insertBlock缺少参数id`);
    return;
  }
  const res: TransactionRes[] = await request("/api/block/insertBlock", data);
  if (protyle) {
    protyle.undo.add(
      res[0].doOperations,
      res[0].doOperations.map((e) => {
        return { action: "delete", id: e.id };
      }),
      protyle
    );
  }
  return res;
}

/**
 * 更新块一般会丢失所有属性，注意获取和更新属性
 */
export async function updateBlock(
  data: {
    dataType: DataType;
    data: string;
    id: string;
  },
  protyle?: IProtyle,
  oldHtml?: string
): Promise<TransactionRes[]> {
  const res: TransactionRes[] = await request("/api/block/updateBlock", data);
  if (protyle && oldHtml) {
    //*undo id必须一致
    const div = document.createElement("div");
    div.innerHTML = oldHtml;
    (div.firstChild as HTMLElement).setAttribute("data-node-id", data.id);
    //*还原html块中的转义字符
    const protyleHtml = div.querySelector("protyle-html");
    if (protyleHtml) {
      let dataContent = protyleHtml.getAttribute("data-content");
      dataContent = dataContent
        .replace(/&amp;/g, "&")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'");
      protyleHtml.setAttribute("data-content", dataContent);
    }
    protyle.undo.add(
      res[0].doOperations,
      [{ action: "update", data: div.innerHTML, id: data.id }],
      protyle
    );
  }
  return res;
}

/**
 * 更新块的同时保留属性
 */
export async function updateBlockWithAttr(
  data: {
    dataType: DataType;
    data: string;
    id: string;
  },
  protyle?: IProtyle,
  oldHtml?: string
): Promise<TransactionRes[]> {
  const attr = await getBlockAttrs({ id: data.id });
  const result = await updateBlock(data, protyle, oldHtml);
  await setBlockAttrs({
    id: data.id,
    attrs: attr,
  });
  return result;
}

/**
 * TODO undo仍然存在问题
 */
export async function deleteBlock(
  data: {
    id: string;
  },
  protyle?: IProtyle,
  oldHtml?: string,
  parentID?: BlockId,
  previousID?: BlockId
): Promise<TransactionRes[]> {
  const res: TransactionRes[] = await request("/api/block/deleteBlock", data);
  if (protyle && oldHtml) {
    //*undo id必须一致
    const div = document.createElement("div");
    div.innerHTML = oldHtml;
    (div.firstChild as HTMLElement).setAttribute("data-node-id", data.id);
    const undo = res[0].doOperations.map((e) => {
      return {
        action: "insert",
        data: div.innerHTML,
        id: e.id,
        parentID,
        previousID,
      } as IOperation;
    });
    protyle.undo.add(res[0].doOperations, undo.reverse(), protyle);
  }
  return res;
}

/**
 *
 * @param parentID 父块的 ID，用于锚定插入位置，previousID 和 parentID 不能同时为空，同时存在的话优先使用 previousID
 */
export async function moveBlock(data: {
  id: string;
  previousID: string;
  parentID: string;
}): Promise<TransactionRes[]> {
  if (!data.previousID && !data.parentID) {
    console.error(`moveBlock缺少参数id`);
  }
  return request("/api/block/moveBlock", data);
}

export async function getHeadingLevelTransaction(data: {
  id: string;
  level: number;
}): Promise<TransactionRes> {
  return request("/api/block/getHeadingLevelTransaction", data);
}
