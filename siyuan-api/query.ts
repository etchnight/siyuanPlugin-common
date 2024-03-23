/**sqlite数据库查询相关 */
import { request } from "./common";
import { Block, BlockId, Ref } from "../types/siyuan-api";

export async function requestQuerySQL(stmt: string): Promise<any[]> {
  return request("/api/query/sql", { stmt: stmt });
}

/**
 *
 * @param id
 * @returns 返回直接子级块
 */
export async function queryChildBlocks(id: BlockId): Promise<Block[]> {
  return requestQuerySQL(
    `SELECT blocks.* FROM blocks WHERE blocks.parent_id='${id}' LIMIT 1000`
  );
}

export async function queryFirstChildBlock(block: Block): Promise<Block> {
  let children = await queryChildBlocks(block.id);
  return children.find((e) => {
    return e.content === block.fcontent;
  });
}
export async function queryDescendantBlocks(block: Block): Promise<
  (Block & {
    layer: number;
  })[]
> {
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

/**
 *
 * @param id
 * @returns layer约大表示与该块的关系越远
 */
export async function queryAncestorBlocks(id: BlockId): Promise<
  (Block & {
    layer: number;
  })[]
> {
  return requestQuerySQL(
    `WITH RECURSIVE
    parent_of(id,parent_id,root_id,hash,box,path,hpath,name,alias,memo,tag,content,fcontent,markdown,length,type,subtype,ial,sort,created,updated,layer) AS(
      SELECT blocks.*,0  FROM blocks WHERE blocks.id='${id}'
      UNION
      SELECT blocks.*,parent_of.layer+1 FROM blocks,parent_of WHERE blocks.id=parent_of.parent_id LIMIT 100
      )
    SELECT * FROM parent_of ORDER BY layer`
  );
}

export async function queryBlocksByTag(tag: string): Promise<Block[]> {
  return requestQuerySQL(
    `SELECT * FROM blocks WHERE blocks.id IN
      (SELECT spans.block_id FROM spans WHERE spans.type LIKE '%tag%' AND content='${tag}')`
  );
}

export async function queryBlockById(id: string): Promise<Block | undefined> {
  let blockList = await requestQuerySQL(
    `SELECT * FROM blocks WHERE id='${id}'`
  );
  return blockList[0];
}

/**
 * @deprecated 对于嵌入块有些时候查询不成功
 */
export async function queryRefBlockById(
  id: string
): Promise<Block[] | undefined> {
  let blockList = await requestQuerySQL(
    `SELECT blocks.* FROM blocks WHERE blocks.id IN
    (SELECT def_block_id FROM refs WHERE block_id='${id}') `
  );
  return blockList;
}

/**
 * queryRefBlockById 的替代方法，针对嵌入块进行了优化
 */
export async function queryRefBlockByBlock(
  block: Block
): Promise<Block[] | undefined> {
  if (block.type === "query_embed") {
    const stmt = block.markdown.match(/(?<=\{\{).*(?=\}\})/);
    return await requestQuerySQL(stmt[0]);
  } else {
    return await requestQuerySQL(
      `SELECT blocks.* FROM blocks WHERE blocks.id IN
      (SELECT def_block_id FROM refs WHERE block_id='${block.id}') `
    );
  }
}

export async function queryRefInfoById(id: BlockId): Promise<Ref[]> {
  return requestQuerySQL(`SELECT * FROM refs WHERE block_id='${id}'`);
}

export async function queryDefInfoById(defId: BlockId): Promise<Ref[]> {
  return requestQuerySQL(`SELECT * FROM refs WHERE def_block_id='${defId}'`);
}
