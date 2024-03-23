/**
 * Copyright (c) 2023 frostime. All rights reserved.
 */

import { Lute, Menu } from "siyuan";

/**
 * Frequently used data structures in SiYuan
 */
export type DocumentId = string;
export type BlockId = string;
export type NotebookId = string;
export type PreviousID = BlockId;
export type ParentID = BlockId | DocumentId;

export type Notebook = {
  id: NotebookId;
  name: string;
  icon: string;
  sort: number;
  closed: boolean;
};

export type NotebookConf = {
  name: string;
  closed: boolean;
  refCreateSavePath: string;
  createDocNameTemplate: string;
  dailyNoteSavePath: string;
  dailyNoteTemplatePath: string;
};

export type BlockType =
  | "d"
  | "s"
  | "h"
  | "t" //table 表格
  | "l" //列表
  | "m" //math 公式块
  | "i"
  | "p"
  | "f"
  | "query_embed" //嵌入块
  | "audio"
  | "video"
  | "other"
  | "box";

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
  | "other"
  | "box"; //!

/**
 * 数据库查询返回该结果
 * @ial {: [key: string]: string };
 */
export type Block = {
  id: BlockId;
  parent_id?: BlockId;
  root_id: DocumentId;
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
};
/**
 * 数据库refs表查询返回该结果
 */
export type Ref = {
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
};

/**
 * 一些搜索类api会返回该 block 结果
 */
export type BlockTree = Omit<
  Block,
  "root_id" | "parent_id" | "hpath" | "subtype" | "type"
> & {
  rootID: string;
  parentID: string;
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
type span = {
  block_id: BlockId;
  box: BlockId;
  content: string;
  ial: string;
  id: string;
  markdown: string;
  path: string;
  root_id: DocumentId;
  type: spanSqliteType;
};
export type doOperation = {
  action: string;
  data: string;
  id: BlockId;
  parentID: BlockId | DocumentId;
  previousID: BlockId;
  retData: null;
};

//declare global {
export interface window {
  siyuan: {
    altIsPressed: boolean;
    backStack: Array;
    blockPanels: {
      app: any;
      defIds: BlockId[];
      editors: any[];
      element: HTMLElement;
      id: string;
      isBacklink: undefined | boolean;
      nodeIds: BlockId[];
      targetElement: undefined | HTMLElement;
      x: number;
      y: number;
    }[];
    config: any;
    ctrlIsPressed: boolean;
    dialogs: Array;
    emojis: Array;
    languages: any;
    layout: {
      layout: ue;
      centerLayout: ue;
      leftDock: jc;
      rightDock: jc;
      bottomDock: jc;
    };
    menus: {
      menu: Menu;
    };
    notebooks: Array;
    reqIds: any;
    shiftIsPressed: boolean;
    storage: any;
    transactions: Array;
    user: any;
    ws: Ot;
  };
  Lute: typeof Lute;
}
//}

//todo 不全，以后再补
export type spanSqliteType =
  | "textmark tag"
  | "textmark strong"
  | "textmark block-ref"
  | "textmark text"
  | "textmark sup"
  | "textmark mark"
  | "textmark kbd"
  | "textmark code";

//\kernel\treenode\node.go(翻转)
export enum ETypeAbbrMap {
  // 块级元素
  d = "NodeDocument",
  h = "NodeHeading",
  l = "NodeList",
  i = "NodeListItem",
  c = "NodeCodeBlock",
  m = "NodeMathBlock",
  t = "NodeTable",
  b = "NodeBlockquote",
  s = "NodeSuperBlock",
  p = "NodeParagraph",
  html = "NodeHTMLBlock",
  query_embed = "NodeBlockQueryEmbed",
  ial = "NodeKramdownBlockIAL",
  iframe = "NodeIFrame",
  widget = "NodeWidget",
  tb = "NodeThematicBreak",
  video = "NodeVideo",
  audio = "NodeAudio",
  text = "NodeText",
  img = "NodeImage",
  link_text = "NodeLinkText",
  link_dest = "NodeLinkDest",
  textmark = "NodeTextMark",
}
