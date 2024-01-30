import { Block } from "../types/siyuan-api";
import { request } from "./common";

export async function searchTag(
  k: string
): Promise<{ k: string; tags: string[] }> {
  return request("/api/search/searchTag", { k: k });
}

export enum SearchMethod {
  "keyword",
  "QuerySyntax",
  "SQL",
  "RegExp",
}
interface SearchTypes {
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
}
enum SearchOrderBy {
  "类型",
  "创建时间升序",
  "创建时间降序",
  "修改时间升序",
  "修改时间降序",
  "按相关度升序",
  "按相关度降序",
}
enum SearchGroupBy {
  "不分组",
  "按文档分组",
}
export type FullTextSearchBlockResult = Omit<Block, "root_id" | "parent_id"> & {
  rootID: string;
  parentID: string;
  folded: boolean;
  refText: string;
  refs: null; //todo
  defID: string;
  defPath: string;
  children: null; //todo
  depth: number;
  count: number;
  riffCardID: string;
  riffCard: null; //todo
};
/**
 *
 * @param query 查询关键词或表达式
 * @param method
 * @param types 默认全选，仅需要标明哪些是false
 * @param paths 'xxx.sy'形式，空为查询所有
 * @returns
 */
export async function fullTextSearchBlock(
  query: string,
  method: SearchMethod,
  types: SearchTypes,
  paths: string[],
  orderBy: SearchOrderBy,
  groupBy: SearchGroupBy
): Promise<{
  blocks: Array<FullTextSearchBlockResult>;
  matchedBlockCount: number;
  matchedRootCount: number;
  pageCount: number;
}> {
  let fullTypes: SearchTypes = {
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
