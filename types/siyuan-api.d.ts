/**
 * Copyright (c) 2023 frostime. All rights reserved.
 */

/**
 * Frequently used data structures in SiYuan
 */
export type BlockId = string;

export type BlockType =
  | "d"
  | "h"
  | "l"
  | "i"
  | "c"
  | "m"
  | "t"
  | "b"
  | "s"
  | "p"
  | "html"
  | "query_embed"
  | "av"
  | "ial"
  | "iframe"
  | "widget"
  | "tb"
  | "video"
  | "audio";

export type NodeType =
  | "NodeAttributeView"
  | "NodeDocument"
  | "NodeHeading"
  | "NodeList"
  | "NodeListItem"
  | "NodeCodeBlock"
  | "NodeMathBlock"
  | "NodeTable"
  | "NodeBlockquote"
  | "NodeSuperBlock"
  | "NodeParagraph"
  | "NodeHTMLBlock"
  | "NodeBlockQueryEmbed"
  | "NodeKramdownBlockIAL"
  | "NodeIFrame"
  | "NodeWidget"
  | "NodeThematicBreak"
  | "NodeVideo"
  | "NodeAudio"
  | "NodeText"
  | "NodeImage"
  | "NodeLinkText"
  | "NodeLinkDest"
  | "NodeTextMark";

export type BlockSubType =
  | "d1"
  | "d2"
  | "s1"
  | "s2"
  | "s3"
  | "t1"
  | "t2"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "table"
  | "task"
  | "toggle"
  | "latex"
  | "quote"
  | "html"
  | "code"
  | "footnote"
  | "cite"
  | "collection"
  | "bookmark"
  | "attachment"
  | "comment"
  | "mindmap"
  | "spreadsheet"
  | "calendar"
  | "image"
  | "audio"
  | "video"
  | "other";

/**
 * 数据库查询返回该结果
 * @ial {: [key: string]: string };
 */
export interface Block {
  id: BlockId;
  parent_id?: BlockId;
  root_id: BlockId;
  hash: string;
  box: string;
  path: string;
  hpath: string;
  name: string;
  alias: string;
  memo: string;
  tag: string;
  content: string;
  fcontent?: string;
  markdown: string;
  length: number;
  type: BlockType;
  subtype: BlockSubType;
  ial?: string; //{ [key: string]: string };
  sort: number;
  created: string;
  updated: string;
}
/**
 * 数据库refs表查询返回该结果
 */
export interface Ref {
  id: BlockId;
  def_block_id: BlockId;
  def_block_parent_id: BlockId;
  def_block_root_id: BlockId;
  def_block_path: string;
  block_id: BlockId;
  root_id: BlockId;
  box: BlockId;
  path: string;
  content: string;
  markdown: string;
  type: "textmark" | "query_embed";
}

/**
 * 一些搜索类api会返回该 block 结果
 */
export type BlockTree = Omit<
  Block,
  "root_id" | "parent_id" | "hpath" | "subtype" | "type"
> & {
  rootID: string;
  parentID?: string;
  folded: boolean;
  refText: string;
  refs: null; //todo
  defID: string;
  defPath: string;
  children: Array<BlockTree> | null;
  depth: number;
  count: number;
  riffCardID: string;
  riffCard: null; //todo
  hPath: string;
  subType: string;
  type: ETypeAbbrMap;
};
export interface Ial {
  alias?: string;
  bookmark?: string;
  id?: string;
  memo?: string;
  name?: string;
  updated?: string;
}
