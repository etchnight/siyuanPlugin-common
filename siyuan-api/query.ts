import { request } from "./common";
import { Block } from "../types/siyuan-api";

async function requestQuerySQL(stmt: string): Promise<any[]> {
  return request("/api/query/sql", { stmt: stmt });
}

type BlockDes = Block & {
  layer: number;
};
export async function queryDescendantBlocks(block: Block): Promise<BlockDes[]> {
  let id = "";
  if (block.type == "p") {
    if (!block.parent_id) {
      return [];
    }
    id = block.parent_id;
  } else {
    id = block.id;
  }
  return requestQuerySQL(
    `WITH RECURSIVE
    child_of(id,parent_id,root_id,hash,box,path,hpath,name,alias,memo,tag,content,fcontent,markdown,length,type,subtype,ial,sort,created,updated,layer) AS(
      SELECT blocks.*,0  FROM blocks WHERE blocks.id='${id}'
      UNION
      SELECT blocks.*,child_of.layer+1 FROM blocks,child_of WHERE blocks.parent_id=child_of.id LIMIT 1000
      )
    SELECT * FROM child_of ORDER BY layer`
  );
}

export async function queryBlocksByTag(tag: string): Promise<Block[]> {
  return requestQuerySQL(
    `SELECT * FROM blocks WHERE blocks.id IN
      (SELECT spans.block_id FROM spans WHERE spans.type LIKE '%tag%' AND content='${tag}')`
  );
}
