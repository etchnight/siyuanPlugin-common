import { type IWebSocketData, fetchSyncPost, IObject } from "siyuan";
import { type Block, type BlockTree } from "../types/siyuan-api";

export const BlockTypes = [
  {
    sql: "d",
    node: "NodeDocument",
    search: "document",
  },
  {
    sql: "h",
    node: "NodeHeading",
    search: "heading",
  },
  {
    sql: "p",
    node: "NodeParagraph",
    search: "paragraph",
  },
  {
    sql: "l",
    node: "NodeList",
    search: "list",
  },
  {
    sql: "i",
    node: "NodeListItem",
    search: "listItem",
  },
  {
    sql: "b",
    node: "NodeBlockquote",
    search: "blockquote",
  },
  {
    sql: "c",
    node: "NodeCodeBlock",
    search: "codeBlock",
  },
  {
    sql: "s",
    node: "NodeSuperBlock",
    search: "superBlock",
  },
  {
    sql: "m",
    node: "NodeMathBlock",
    search: "mathBlock",
  },
  {
    sql: "t",
    node: "NodeTable",
    search: "table",
  },
  {
    sql: "query_embed",
    node: "NodeBlockQueryEmbed",
    search: "embedBlock",
  },
  {
    sql: "html",
    node: "NodeHTMLBlock",
    search: "htmlBlock",
  },
];

export enum ETypeAbbrMap {
  // 块级元素
  "d" = "NodeDocument",
  "h" = "NodeHeading",
  "l" = "NodeList",
  "i" = "NodeListItem",
  "c" = "NodeCodeBlock",
  "m" = "NodeMathBlock",
  "t" = "NodeTable",
  "b" = "NodeBlockquote",
  "s" = "NodeSuperBlock",
  "p" = "NodeParagraph",
  "html" = "NodeHTMLBlock",
  "query_embed" = "NodeBlockQueryEmbed",
  "av" = "NodeAttributeView",
  "ial" = "NodeKramdownBlockIAL",
  "iframe" = "NodeIFrame",
  "widget" = "NodeWidget",
  "tb" = "NodeThematicBreak",
  "video" = "NodeVideo",
  "audio" = "NodeAudio",
}

export async function request(
  url: string,
  data: {
    [key: string]: any;
  }
) {
  //入参检查
  for (const key of Object.keys(data)) {
    if (key.search("id") !== -1 || key.search("Id") !== -1) {
      if (typeof data[key] !== typeof "") {
        continue;
      }
      if (!isBlock(data[key])) {
        console.warn(`${url} 入参 ${key} 不是BlockId，可能存在错误`);
      }
    }
  }

  const response: IWebSocketData = await fetchSyncPost(url, data);
  /*   if (url === "/api/file/getFile" && !response.code) {
    //这个API成功后不会返回code字段
    response = {
      code: 0,
      data: response,
      msg: "",
      cmd: "",
      sid: "",
    };
  } */
  if (response.code !== 0) {
    console.group("与内核通信错误：");
    console.warn("调用接口：", url);
    console.warn("数据：", data);
    console.warn("返回值：", response);
    console.groupEnd();
  }
  const res = response.code === 0 ? response.data : null;
  return res;
}

export const isBlock = (value: string) => {
  const reg = new RegExp("^[0-9]{14}-[0-9a-z]{7}$");
  return reg.test(value);
};

/**
 *
 * @param block
 * @returns 仅模拟
 */
export const block2blockTree = (block: Block): BlockTree => {
  return {
    rootID: block.root_id,
    parentID: block.parent_id,
    folded: false,
    refText: "",
    refs: null, //todo
    defID: "",
    defPath: "",
    children: null,
    depth: 0,
    count: 0,
    riffCardID: "",
    riffCard: null, //todo
    hPath: block.hpath,
    subType: block.subtype,
    type: ETypeAbbrMap[block.type],
    id: block.id,
    hash: block.hash,
    box: block.box,
    path: block.path,
    name: block.name,
    alias: block.alias,
    memo: block.memo,
    tag: block.tag,
    content: block.content,
    markdown: block.markdown,
    length: block.length,
    sort: block.sort,
    created: block.created,
    updated: block.updated,
  };
};
