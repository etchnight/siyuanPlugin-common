import { type Block, BlockTree } from "../types/siyuan-api";
import { request } from "./common";

/**
 *
 * @param k
 * @returns tags返回的是html形式（带mark标签）
 */
export async function searchTag(
  k: string
): Promise<{ k: string; tags: string[] }> {
  return request("/api/search/searchTag", { k: k });
}

export enum ESearchMethod {
  "keyword",
  "QuerySyntax",
  "SQL",
  "RegExp",
}
export interface ISearchTypes {
  blockquote?: boolean;
  codeBlock?: boolean;
  document?: boolean;
  embedBlock?: boolean;
  heading?: boolean;
  htmlBlock?: boolean;
  list?: boolean;
  listItem?: boolean;
  mathBlock?: boolean;
  paragraph?: boolean;
  superBlock?: boolean;
  table?: boolean;
  databaseBlock?: boolean;
  [key: string]: boolean | undefined;
}
export enum ESearchOrderBy {
  "类型",
  "创建时间升序",
  "创建时间降序",
  "修改时间升序",
  "修改时间降序",
  "按相关度升序",
  "按相关度降序",
}
export enum ESearchGroupBy {
  "不分组",
  "按文档分组",
}

/**
 *
 * @param query 查询关键词或表达式
 * @param method
 * @param types 默认全选，仅需要标明哪些是false
 * @param paths 'xxx.sy'形式，空为查询所有
 * todo 'siyuan'中的ISearchOption
 * @returns
 */
export async function fullTextSearchBlock(
  query: string,
  method: ESearchMethod,
  types: ISearchTypes,
  paths: string[],
  orderBy: ESearchOrderBy,
  groupBy: ESearchGroupBy
): Promise<{
  blocks: Array<BlockTree>;
  matchedBlockCount: number;
  matchedRootCount: number;
  pageCount: number;
}> {
  let fullTypes: ISearchTypes = {
    blockquote: true,
    codeBlock: true,
    document: true,
    embedBlock: true,
    heading: true,
    htmlBlock: true,
    list: true,
    listItem: true,
    mathBlock: true,
    paragraph: true,
    superBlock: true,
    table: true,
    databaseBlock: true,
  };
  for (let typeKey of Object.keys(fullTypes)) {
    if (types[typeKey] === false) {
      fullTypes[typeKey] = false;
    }
  }
  return request("/api/search/fullTextSearchBlock", {
    query: query,
    method: method,
    types: fullTypes,
    paths: paths,
    groupBy: groupBy,
    orderBy: orderBy,
    page: 1, // todo 未知参数意义
  });
}

/**
 *
 * @param key
 * @param id nodeElement ? nodeElement.getAttribute("data-node-id") : protyle.block.parentID,
 * @param beforeLen Math.floor((Math.max(protyle.element.clientWidth / 2, 320) - 58) / 28.8),
 * @param rootID protyle.block.rootID,
 * @param isSquareBrackets ["[[", "【【"].includes(protyle.hint.splitChar)
 * @returns
 */
export async function searchRefBlock(data: {
  key: string;
  id: string;
  beforeLen: number;
  rootID: string;
  isSquareBrackets?: boolean;
}): Promise<{
  blocks: Array<BlockTree>;
  k: string;
  newDoc: boolean;
  reqId: number; //new Date().getTime();
}> {
  return request("/api/search/searchRefBlock", data);
}
