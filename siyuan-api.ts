/**
 * Copyright (c) 2023 frostime. All rights reserved.
 * https://github.com/frostime/sy-plugin-template-vite
 *
 * See API Document in [API.md](https://github.com/siyuan-note/siyuan/blob/master/API.md)
 * API 文档见 [API_zh_CN.md](https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md)
 */

import {
  Dialog,
  fetchSyncPost,
  IMenuItemOption,
  IObject,
  IWebSocketData,
} from "siyuan";
import {
  Notebook,
  NotebookConf,
  NotebookId,
  DocumentId,
  BlockId,
  doOperation,
  PreviousID,
  ParentID,
  BlockSubType,
  Block,
  BlockType,
  spanSqliteType,
  span,
  Window_siyuan,
} from "./types/siyuan-api";
async function request(url: string, data: any) {
  let response: IWebSocketData = await fetchSyncPost(url, data);
  let res = response.code === 0 ? response.data : null;
  return res;
}

// **************************************** Noteboook ****************************************
const _NOTEBOOK = 0;
export type ReslsNotebooks = {
  notebooks: Notebook[];
};

export async function lsNotebooks(): Promise<ReslsNotebooks> {
  let url = "/api/notebook/lsNotebooks";
  return request(url, "");
}

export async function openNotebook(notebook: NotebookId) {
  let url = "/api/notebook/openNotebook";
  return request(url, { notebook: notebook });
}

export async function closeNotebook(notebook: NotebookId) {
  let url = "/api/notebook/closeNotebook";
  return request(url, { notebook: notebook });
}

export async function renameNotebook(notebook: NotebookId, name: string) {
  let url = "/api/notebook/renameNotebook";
  return request(url, { notebook: notebook, name: name });
}

export async function createNotebook(name: string): Promise<Notebook> {
  let url = "/api/notebook/createNotebook";
  return request(url, { name: name });
}

export async function removeNotebook(notebook: NotebookId) {
  let url = "/api/notebook/removeNotebook";
  return request(url, { notebook: notebook });
}

export type ResGetNotebookConf = {
  box: string;
  conf: NotebookConf;
  name: string;
};

export async function getNotebookConf(
  notebook: NotebookId
): Promise<ResGetNotebookConf> {
  let data = { notebook: notebook };
  let url = "/api/notebook/getNotebookConf";
  return request(url, data);
}

export async function setNotebookConf(
  notebook: NotebookId,
  conf: NotebookConf
): Promise<NotebookConf> {
  let data = { notebook: notebook, conf: conf };
  let url = "/api/notebook/setNotebookConf";
  return request(url, data);
}

// **************************************** Document ****************************************
const _DOCUMENT = 0;
export async function createDocWithMd(
  notebook: NotebookId,
  path: string,
  markdown: string
): Promise<DocumentId> {
  let data = {
    notebook: notebook,
    path: path,
    markdown: markdown,
  };
  let url = "/api/filetree/createDocWithMd";
  return request(url, data);
}

export async function renameDoc(
  notebook: NotebookId,
  path: string,
  title: string
): Promise<DocumentId> {
  let data = {
    doc: notebook,
    path: path,
    title: title,
  };
  let url = "/api/filetree/renameDoc";
  return request(url, data);
}

export async function removeDoc(notebook: NotebookId, path: string) {
  let data = {
    notebook: notebook,
    path: path,
  };
  let url = "/api/filetree/removeDoc";
  return request(url, data);
}

export async function moveDocs(
  fromPaths: string[],
  toNotebook: NotebookId,
  toPath: string
) {
  let data = {
    fromPaths: fromPaths,
    toNotebook: toNotebook,
    toPath: toPath,
  };
  let url = "/api/filetree/moveDocs";
  return request(url, data);
}

export async function getHPathByPath(
  notebook: NotebookId,
  path: string
): Promise<string> {
  let data = {
    notebook: notebook,
    path: path,
  };
  let url = "/api/filetree/getHPathByPath";
  return request(url, data);
}

export async function getHPathByID(id: BlockId): Promise<string> {
  let data = {
    id: id,
  };
  let url = "/api/filetree/getHPathByID";
  return request(url, data);
}

// **************************************** Asset Files ****************************************
const _ASSET = 0;
export type ResUpload = {
  errFiles: string[];
  succMap: { [key: string]: string };
};

export async function upload(
  assetsDirPath: string,
  files: any[]
): Promise<ResUpload> {
  let form = new FormData();
  form.append("assetsDirPath", assetsDirPath);
  for (let file of files) {
    form.append("file[]", file);
  }
  let url = "/api/asset/upload";
  return request(url, form);
}

// **************************************** Block ****************************************
const _BLOCK = 0;
export type ResdoOperations = {
  doOperations: doOperation[];
  undoOperations: doOperation[] | null;
};
type DataType = "markdown" | "dom";
export async function insertBlock(
  dataType: DataType,
  data: string,
  previousID: BlockId
): Promise<ResdoOperations> {
  let data1 = {
    dataType: dataType,
    data: data,
    previousID: previousID,
  };
  let url = "/api/block/insertBlock";
  return request(url, data1);
}

export async function appendBlock(
  dataType: DataType,
  data: string,
  parentID: BlockId | DocumentId
): Promise<ResdoOperations> {
  let data1 = {
    dataType: dataType,
    data: data,
    parentID: parentID,
  };
  let url = "/api/block/appendBlock";
  return request(url, data1);
}

export async function updateBlock(
  dataType: DataType,
  data: string,
  id: BlockId
): Promise<ResdoOperations> {
  let data1 = {
    dataType: dataType,
    data: data,
    id: id,
  };
  let url = "/api/block/updateBlock";
  return request(url, data1);
}

export async function deleteBlock(id: BlockId): Promise<ResdoOperations> {
  let data = {
    id: id,
  };
  let url = "/api/block/deleteBlock";
  return request(url, data);
}

export async function moveBlock(
  id: BlockId,
  previousID: PreviousID | null = null,
  parentID: ParentID | null = null
): Promise<ResdoOperations> {
  let data = {
    id: id,
    previousID: previousID,
    parentID: parentID,
  };
  let url = "/api/block/moveBlock";
  return request(url, data);
}

export type ResGetBlockKramdown = {
  id: BlockId;
  kramdown: string;
};

export async function getBlockKramdown(
  id: BlockId
): Promise<ResGetBlockKramdown> {
  let data = {
    id: id,
  };
  let url = "/api/block/getBlockKramdown";
  return request(url, data);
}

export type ChildBlock = {
  id: BlockId;
  type: BlockType;
  subtype?: BlockSubType;
};
export async function getChildBlocks(id: BlockId): Promise<ChildBlock[]> {
  let data = {
    id: id,
  };
  let url = "/api/block/getChildBlocks";
  return request(url, data);
}

// **************************************** Attributes ****************************************
const _Attributes = 0;
export async function setBlockAttrs(
  id: BlockId,
  attrs: { [key: string]: string }
) {
  let data = {
    id: id,
    attrs: attrs,
  };
  let url = "/api/attr/setBlockAttrs";
  return request(url, data);
}

export async function getBlockAttrs(
  id: BlockId
): Promise<{ [key: string]: string }> {
  let data = {
    id: id,
  };
  let url = "/api/attr/getBlockAttrs";
  return request(url, data);
}

// **************************************** SQL ****************************************
const _SQL = 0;
export async function sql(sql: string): Promise<any[]> {
  let sqldata = {
    stmt: sql,
  };
  let url = "/api/query/sql";
  return request(url, sqldata);
}

/**
 *
 * @param blockId
 * @returns
 * @deprecated 缺少返回值是空的情况？
 */
export async function getBlockByID(blockId: string): Promise<Block> {
  let sqlScript = `select * from blocks where id ='${blockId}'`;
  let data = await sql(sqlScript);
  return data[0];
}

export async function getBlockById(
  id: null | undefined | string
): Promise<Block | null> {
  if (!id) {
    return null;
  }
  let blockList = await sql(`SELECT * FROM blocks WHERE id='${id}'`);
  if (blockList.length > 0) {
    return blockList[0];
  }
  //*如果是文档，而文档没有内容也会查不到
  try {
    const box = await getNotebookConf(id);
    if (box) {
      return box2blockLike(box);
    }
  } catch (e) {
    console.warn(`未能找到id为${id}的块或文件夹，其可能是文档且无内容`);
    //console.error(e);
  }
  return null;
}
// **************************************** Template ****************************************
const _Templates = 0;
export type ResGetTemplates = {
  content: string;
  path: string;
};
export async function render(
  id: DocumentId,
  path: string
): Promise<ResGetTemplates> {
  let data = {
    id: id,
    path: path,
  };
  let url = "/api/template/render";
  return request(url, data);
}

export async function renderSprig(template: string): Promise<string> {
  let url = "/api/template/renderSprig";
  return request(url, { template: template });
}

// **************************************** File ****************************************

const _File = 0;
export async function getFile(path: string): Promise<any> {
  let data = {
    path: path,
  };
  let url = "/api/file/getFile";
  try {
    let file = await fetchSyncPost(url, data);
    return file;
  } catch (error_msg) {
    return null;
  }
}

export async function putFile(path: string, isDir: boolean, file: any) {
  let form = new FormData();
  form.append("path", path);
  form.append("isDir", isDir.toString());
  // Copyright (c) 2023, terwer.
  // https://github.com/terwer/siyuan-plugin-importer/blob/v1.4.1/src/api/kernel-api.ts
  form.append("modTime", Math.floor(Date.now() / 1000).toString());
  form.append("file", file);
  let url = "/api/file/putFile";
  return request(url, form);
}

export async function removeFile(path: string) {
  let data = {
    path: path,
  };
  let url = "/api/file/removeFile";
  return request(url, data);
}

export type ResReadDir = {
  isDir: boolean;
  name: string;
};
export async function readDir(path: string): Promise<ResReadDir> {
  let data = {
    path: path,
  };
  let url = "/api/file/readDir";
  return request(url, data);
}

const _Export = 0;
export type ResExportMdContent = {
  hPath: string;
  content: string;
};
export async function exportMdContent(
  id: DocumentId
): Promise<ResExportMdContent> {
  let data = {
    id: id,
  };
  let url = "/api/export/exportMdContent";
  return request(url, data);
}
const _Conversion = 0;
export type PandocArgs = string;
export async function pandoc(args: PandocArgs[]) {
  let data = {
    args: args,
  };
  let url = "/api/convert/pandoc";
  return request(url, data);
}

const _Notification = 0;
export async function pushMsg(msg: string, timeout?: number): Promise<void> {
  let data: {
    msg: string;
    timeout?: number;
  };
  data = { msg: msg };
  if (timeout) {
    data.timeout = timeout;
  }
  await request("/api/notification/pushMsg", data);
}
export async function pushErrMsg(msg: string, timeout?: number): Promise<void> {
  let data: {
    msg: string;
    timeout?: number;
  };
  data = { msg: msg };
  if (timeout) {
    data.timeout = timeout;
  }
  await request("/api/notification/pushErrMsg", data);
}
// **************************************** System ****************************************
const _System = 0;
export type ResBootProgress = {
  progress: number;
  details: string;
};
export async function bootProgress(): Promise<ResBootProgress> {
  return request("/api/system/bootProgress", {});
}

export async function version(): Promise<string> {
  return request("/api/system/version", {});
}

export async function currentTime(): Promise<number> {
  return request("/api/system/currentTime", {});
}

//*******增补*******/
const _Other = 0;
//import _ from "lodash"
import findKey from "lodash/findKey";
/**
 * box会返回其下文档块,文档会查找子文档和本文档下的内容
 * @param id
 * @returns
 */
export async function getChildrenBlocks(id: BlockId): Promise<Block[]> {
  let children: Block[] = [];
  //*查找子文档、查找本文档下的内容
  children = await sql(`SELECT * FROM blocks WHERE 
  (SUBSTR(blocks.path,LENGTH(blocks.path)-24-23,22) ='${id}' 
  AND type='d')
  OR(parent_id='${id}')`);
  /*
  //*查找本文档下的内容
  children = await sql(`SELECT * FROM blocks WHERE parent_id='${id}'`);
  //*查找子文档
  let childrenDoc = await sql(
    `SELECT * FROM blocks WHERE path LIKE '%${id}%' AND type='d'`
  );
  for (let child of childrenDoc) {
    if (child.path.indexOf(child.id) - child.path.indexOf(id) == 23) {
      children.push(child);
    }
  }*/
  if (children.length > 0) {
    return children;
  }
  //*box会返回其下文档块
  children = await sql(`SELECT * FROM blocks WHERE blocks.box='${id}' 
  AND blocks.type='d' 
  AND LENGTH(blocks.path)<27`);
  return children;
}
/**
 *
 * @param block
 * @returns 文档的父级会返回box或doc,box会返回null
 */
export async function getParentBlock(block: {
  parent_id?: BlockId;
  type: string;
  path: string;
  box: string;
}): Promise<Block | null> {
  let parent: Block | null = null;
  //*普通块查parent
  if (block.parent_id) {
    parent = await getBlockById(block.parent_id);
  }
  if (parent) {
    return parent;
  }
  //*文档查父级文档
  if (block.type == "d") {
    let pathList = block.path.split("/");
    if (pathList.length > 2) {
      parent = await getBlockById(pathList[pathList.length - 2]);
    }
  }
  if (parent) {
    return parent;
  }
  //*无父级文档查找box
  if (block.box) {
    const box = await getNotebookConf(block.box);
    return box2blockLike(box);
  }
  return null;
}
function box2blockLike(box: { name: string; box: BlockId }) {
  let boxLikeBlock: Block = {
    content: box.name,
    id: box.box,
    name: box.name,
    root_id: "",
    parent_id: "",
    path: "/",
    hash: "",
    box: "",
    hpath: "",
    alias: "",
    memo: "",
    tag: "",
    markdown: box.name,
    length: 0,
    type: "box",
    subtype: "box",
    sort: 0,
    created: "0",
    updated: "0",
  };
  return boxLikeBlock;
}
export async function getDescendantBlocks(id: string): Promise<Block[]> {
  /*递归查询子级*/
  return await sql(`
  WITH RECURSIVE
    children_of(id,parent_id,root_id,hash,box,path,hpath,name,alias,memo,tag,content,fcontent,markdown,length,type,subtype,ial,sort,created,updated,layer) AS(
      SELECT blocks.*,0  FROM blocks WHERE blocks.id='${id}'
      UNION
      SELECT blocks.*,children_of.layer-1 FROM blocks,children_of WHERE blocks.parent_id=children_of.id LIMIT 500
      )
    SELECT * FROM children_of `);
}
/**
 * 递归查询祖先
 * @returns 本级排在第一位，越向后层级越向上
 */
export async function getAncestorBlocks(id: string): Promise<Block[]> {
  return await sql(`
  WITH RECURSIVE
  parent_of(id,parent_id,root_id,hash,box,path,hpath,name,alias,memo,tag,content,fcontent,markdown,length,type,subtype,ial,sort,created,updated,layer) AS(
    SELECT blocks.*,0  FROM blocks WHERE blocks.id='${id}'
    UNION
    SELECT blocks.*,parent_of.layer+1 FROM blocks,parent_of WHERE blocks.id=parent_of.parent_id LIMIT 100
    )
  SELECT * FROM parent_of ORDER BY layer`);
}
export async function getRefBlocksWithRefmarkdown(id: string) {
  return await sql(`SELECT blocks.*,refs.markdown AS refmarkdown
    FROM blocks JOIN refs ON blocks.id=refs.def_block_id
    WHERE blocks.id IN
    (SELECT def_block_id FROM refs WHERE block_id='${id}')
    AND refs.block_id='${id}'`);
}
export async function getRefBlocks(id: string): Promise<Block[]> {
  return await sql(`SELECT blocks.* FROM blocks WHERE blocks.id IN
    (SELECT def_block_id FROM refs WHERE block_id='${id}')`);
}
export async function getDefBlocksWithRefmarkdown(id: string) {
  return await sql(`SELECT blocks.*,refs.markdown AS refmarkdown
  FROM blocks JOIN refs ON blocks.id=refs.block_id
  WHERE blocks.id IN
  (SELECT block_id FROM refs WHERE def_block_id='${id}') 
  AND refs.def_block_id='${id}'`);
}
export async function getDefBlocks(id: string): Promise<Block[]> {
  return await sql(`SELECT blocks.* FROM blocks WHERE blocks.id IN
  (SELECT block_id FROM refs WHERE def_block_id='${id}') `);
}
export async function getTagsById(id: BlockId): Promise<span[]> {
  return await sql(`SELECT * FROM spans WHERE block_id='${id}' 
  AND type='textmark tag'`);
}

/*
export interface Block {
  id: string;
  parent_id: string;
  root_id: string;
  hash: string;
  box: string;
  path: string;
  hpath: string;
  name: string;
  alias: string;
  memo: string;
  tag: string;
  content: string;
  fcontent: string;
  markdown: string;
  length: string;
  type: string;
  subtype: string;
  ial: string;
  sort: string;
  created: string;
  updated: string;
  refmarkdown?: string;
  layer?: string; //查询先祖和后代时使用
}*/

async function getDescendantBlocksSorted(id: string): Promise<Block[]> {
  let dom = await getDom(id);
  let domBlockAttrList: domBlockAttr[] = [];
  if (dom) {
    getDomBlockAttrsFromDom(dom, domBlockAttrList);
  }
  let blockList: Block[] = await getDescendantBlocks(id);
  blockList.sort((a, b) => {
    let indexOfa = findKey(domBlockAttrList, (e: domBlockAttr) => {
      return e.data_node_id == a.id;
    }) as string;
    let indexOfb: string | undefined = findKey(
      domBlockAttrList,
      (e: domBlockAttr) => {
        return e.data_node_id == b.id;
      }
    ) as string;
    return parseInt(indexOfa) - parseInt(indexOfb);
  });
  return blockList;
}

export async function getMarkdownSorted(id: string): Promise<string> {
  let blocks = await getDescendantBlocksSorted(id);
  let markdownList: string[] = [];
  for (let block of blocks) {
    if (block.markdown) {
      markdownList.push(block.markdown);
    }
  }
  return markdownList.join("\n\n");
}
/**
 * 通过dom获取块及子块的信息，该函数会改变attrList
 * @param dom
 * @param attrList
 */
function getDomBlockAttrsFromDom(dom: Element, attrList: domBlockAttr[]) {
  let domBlockAttr: domBlockAttr = {
    data_node_id: dom.getAttribute("data-node-id"),
    data_type: dom.getAttribute("data-type"),
    data_node_index: dom.getAttribute("data-node-index"),
    class: dom.classList,
  };
  if (domBlockAttr.data_node_id) {
    attrList.push(domBlockAttr);
  }
  for (let item of dom.children) {
    getDomBlockAttrsFromDom(item, attrList);
  }
}

interface domBlockAttr {
  data_node_id: string | null;
  data_node_index: string | null;
  data_type: string | null;
  class: DOMTokenList;
}

export async function getDom(
  blockId: string | null
): Promise<HTMLElement | null> {
  if (!blockId) {
    return null;
  }
  //blockId对应的获取dom，含子级
  const req = await getDoc(blockId);
  if (!req) {
    return null;
  }
  let dom = document.createElement("div") as HTMLElement;
  dom.innerHTML = req.content;
  //列表块转换
  let firstChild = dom.firstElementChild as HTMLElement;
  if (firstChild && firstChild.getAttribute("data-type") == "NodeList") {
    dom = firstChild;
  }
  return dom;
}

/**
 * @deprecated 该函数应该用eventBus代替
 * @description 获取当前光标所在块id，注意不是鼠标指针,这是一个纯前端方法
 * 如果没有找到，则返回null
 * 这个函数不能在挂件中使用
 */
export function getFocusNodeId(): string | null {
  if (!window) {
    return null;
  }
  let nodeId: string | null = null;
  //*第一种方法 getSelection方法
  let selection = window.getSelection();
  let focusNode = selection?.focusNode;
  if (focusNode) {
    let parent = focusNode.parentElement;
    while (!nodeId) {
      if (parent) {
        nodeId = parent.getAttribute("data-node-id");
      } else {
        break;
      }
      if (!nodeId) {
        parent = parent.parentElement;
      }
    }
  }
  //*第二种方法 查找面包屑
  if (!nodeId) {
    let div = document.querySelector(
      "div.layout__wnd--active .protyle-breadcrumb .protyle-breadcrumb__item--active"
    );
    if (div) {
      nodeId = div.getAttribute("data-node-id");
    }
  }
  if (!nodeId) {
    //pushErrMsg("未找到当前块");
    return null;
  }
  return nodeId;
}

/**
 * @deprecated 该函数应用eventBus代替
 * @description 在现有菜单中增加功能，纯前端功能，此函数应该只在插件中运行1次
 * @param showCondition 当返回false时，不显示,items为现有菜单，
 */
export function addMenuItemOnExist(
  item: IMenuItemOption,
  showCondition: () => boolean
) {
  const menuNode = document.getElementById("commonMenu") as HTMLElement;
  const config = { attributes: true, childList: true, subtree: false };
  // 当观察到变动时执行的回调函数
  const callback = function (mutationsList: MutationRecord[]) {
    if (!showCondition()) {
      return;
    }
    const menu = window.siyuan.menus.menu;
    const itemEle = menu.addItem(item);
    /*
    const items = menuNode.querySelector(".b3-menu__items");
    if (!items) {
      return;
    }
    //不允许出现同label选项
    for (let child of items.children) {
      const label = child.querySelector(".b3-menu__label");
      if (label?.textContent == item.label) {
        return;
      }
    }
    items.appendChild(itemEle);*/
    //console.log(menu, mutationsList, itemEle);
  };
  const observer = new MutationObserver(callback);
  observer.observe(menuNode, config);
}

//非隐藏元素后代中选中的元素
export function getSelectDom() {
  return document.querySelector(":not(.fn__none) .protyle-wysiwyg--select");
}

export function showKarkdownInDialog(
  kramdown: string,
  dialogOpt: {
    title?: string;
    transparent?: boolean;
    width?: string;
    height?: string;
    destroyCallback?: (options?: IObject) => void;
    disableClose?: boolean;
    disableAnimation?: boolean;
  }
) {
  const lute = window.Lute.New();
  const ele = lute.Md2BlockDOM(kramdown);
  const content = ` <div class="b3-dialog__content">
  <div class="protyle-wysiwyg protyle-wysiwyg--attr" style="height: 360px;">${ele}</div>
</div>`;
  let options: dialogOpt = {
    title: dialogOpt.title,
    transparent: dialogOpt.transparent,
    content: content,
    width: dialogOpt.width,
    height: dialogOpt.height,
    destroyCallback: dialogOpt.destroyCallback,
    disableClose: dialogOpt.disableClose,
    disableAnimation: dialogOpt.disableAnimation,
  };
  const dialog = new Dialog(options);
}
interface dialogOpt {
  title?: string;
  transparent?: boolean;
  content: string;
  width?: string;
  height?: string;
  destroyCallback?: (options?: IObject) => void;
  disableClose?: boolean;
  disableAnimation?: boolean;
}

//*静态方法
const _common = 0;
/**
 * 从((20230702201016-nr1yuiw "2待引用"))类型的文本中提取"2待引用"，无引号
 */
export function getAnchorFromMarkdown(markdown: string) {
  let re = /(?<=\(\([0-9]{14}-[0-9a-zA-Z]{7} ").*?(?="\)\))/g;
  return markdown.match(re);
}

/**
 * 提取((20230702201016-nr1yuiw "2待引用"))中的id
 */

export function getIdFromMarkdown(markdown: string) {
  let re = /(?<=\(\()[0-9]{14}-[0-9a-zA-Z]{7}/g;
  return markdown.match(re);
}

/**
 * 提取((20230702201016-nr1yuiw "2待引用"))中的((20230702201016-nr1yuiw "2待引用"))
 */

export function getCiteFromMarkdown(markdown: string) {
  let re = /\(\([0-9]{14}-[0-9a-zA-Z]{7} ".*?"\)\)/g;
  return markdown.match(re);
}

/**
 * 将思源专有kramdown转化为markdown，目前仅有链接转换功能siyuan://blocks/20230416184252-4ikcvqu
 */
export function kramdown2markdown(kramdown: string) {
  let cites = getCiteFromMarkdown(kramdown);
  let markdown = kramdown;
  if (cites) {
    for (let cite of cites) {
      let idList = getIdFromMarkdown(cite);
      let anchorList = getAnchorFromMarkdown(cite);
      if (idList && anchorList) {
        markdown = markdown.replace(
          cite,
          `[${anchorList[0]}](siyuan://blocks/${idList[0]})`
        );
      }
    }
  }
  return markdown;
}

//*未在doc中写明的api
const _HIDDEN = 0;
export async function getBlockBreadcrumb(id: BlockId): Promise<
  {
    id: BlockId;
    name: string;
    type: typeAbbrMap;
    subType: BlockSubType;
    children: null;
  }[]
> {
  let url = "/api/block/getBlockBreadcrumb";
  return request(url, { excludeTypes: [], id: id });
}

export async function getRefIDs(id: BlockId): Promise<{
  defIDs: BlockId[];
  refIDs: BlockId[];
  refTexts: string[];
}> {
  let url = "/api/block/getRefIDs";
  return request(url, { id: id });
}

export class siyuanQueue {
  //维护一个临时的block列表，每次需要查询block时首先尝试在此列表中取出
  private blocksCache: Block[] = [];
  //维护block之间的关系
  private blocksRelas: blocksRela = {};
  constructor() {}
  public async getBlockById(id: string) {
    let blockAdded = this.isInBlockList(id);
    if (blockAdded) {
      return blockAdded;
    }
    let newBlock = await getBlockById(id);
    if (newBlock) {
      this.blocksCache.push(newBlock);
    }
    return newBlock;
  }
  public async getChildrenBlocks(id: string) {
    return (await this.getValue(
      id,
      "chileren",
      null,
      getChildrenBlocks,
      null
    )) as Block[];
  }
  public async getParentBlock(block: {
    id: string;
    parent_id?: BlockId;
    type: string;
    path: string;
    box: string;
  }) {
    return (await this.getValue(
      block.id,
      "parent",
      block,
      null,
      this.getParentBlockThis
    )) as Block | null;
  }
  private async getParentBlockThis(block: {
    parent_id?: BlockId;
    type: string;
    path: string;
    box: string;
  }): Promise<Block | null> {
    let parent: Block | null = null;
    //*普通块查parent
    if (block.parent_id) {
      parent = await this.getBlockById(block.parent_id);
    }
    if (parent) {
      return parent;
    }
    //*文档查父级文档
    if (block.type == "d") {
      let pathList = block.path.split("/");
      if (pathList.length > 2) {
        parent = await this.getBlockById(pathList[pathList.length - 2]);
      }
    }
    if (parent) {
      return parent;
    }
    //*无父级文档查找box
    if (block.box) {
      const box = await getNotebookConf(block.box);
      return box2blockLike(box);
    }
    return null;
  }
  public async getDefBlocks(id: string) {
    return (await this.getValue(
      id,
      "def",
      null,
      getDefBlocks,
      null
    )) as Block[];
  }
  public async getRefBlocks(id: string) {
    return (await this.getValue(
      id,
      "ref",
      null,
      getRefBlocks,
      null
    )) as Block[];
  }
  private isInBlockList(id: BlockId) {
    return this.blocksCache.find((item) => {
      return item.id == id;
    });
  }
  /**
   * 更新blocksCache，未找到会直接添加
   * @param block
   * @returns 若找到元素，则返回true，否则，返回false
   */
  private updateBlockList(block: Block) {
    let index = this.blocksCache.findIndex((item) => {
      return item.id === block.id;
    });
    if (index >= 0) {
      this.blocksCache[index] = block;
      return true;
    } else {
      this.blocksCache.push(block);
      return false;
    }
  }
  private async getValue(
    id: BlockId,
    key: string,
    block: {
      id: string;
      parent_id?: BlockId;
      type: string;
      path: string;
      box: string;
    } | null,
    callback1: ((arg: string) => Promise<Block[]>) | null,
    callback2:
      | ((arg: {
          parent_id?: BlockId;
          type: string;
          path: string;
          box: string;
        }) => Promise<Block | null>)
      | null
  ): Promise<Block | Block[] | null> {
    if (!id) {
      return null;
    }
    if (!this.blocksRelas[id]) {
      this.blocksRelas[id] = {};
    } else {
      let ids = this.blocksRelas[id][key];
      if (ids) {
        let result: Block | Block[] | null | undefined = [];
        if (Array.isArray(ids)) {
          result = this.blocksCache.filter((item) => {
            return ids?.includes(item.id);
          });
          if (result.length === ids.length) {
            return result;
          }
        } else {
          result = this.isInBlockList(ids);
          if (result) {
            return result;
          }
        }
      }
    }
    let resultCall: Block | Block[] | null = [];
    if (block && callback2) {
      callback2 = callback2.bind(this);
      resultCall = await callback2(block);
    } else if (callback1) {
      callback1 = callback1.bind(this);
      resultCall = await callback1(id);
    }
    if (Array.isArray(resultCall)) {
      this.blocksRelas[id][key] = [];
      let value = this.blocksRelas[id][key] as BlockId[];
      for (let child of resultCall) {
        this.updateBlockList(child);
        value.push(child.id);
      }
    } else if (resultCall) {
      this.updateBlockList(resultCall);
      this.blocksRelas[id][key] = resultCall.id;
      if (id === resultCall.id) {
        console.warn(block);
        //调试
        console.log("resultCall", resultCall);
        console.log(this.blocksCache);
        console.log(this.blocksRelas);
        return null;
      }
    }
    return resultCall;
  }
}
type blocksRela = {
  [id: BlockId]: {
    ref?: BlockId[];
    def?: BlockId[];
    parent?: BlockId;
    chileren?: BlockId[];
    [key: string]: BlockId[] | BlockId | undefined | null;
  };
};
export { BlockId, request };
