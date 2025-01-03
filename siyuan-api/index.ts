//组合导出
import * as attr from "./attr";
import * as block from "./block";

import * as file from "./file";
import * as filetree from "./filetree";
import * as outline from "./outline";
import * as query from "./query";
import * as search from "./search";
import * as transaction from "./transaction";
import * as render from "./render";

export const siyuanApi = {
  attr,
  block,
  file,
  filetree,
  outline,
  query,
  search,
  transaction,
  render,
};
//全部直接导出
export * from "./attr";
export * from "./block";

export * from "./file";
export * from "./filetree";
export * from "./outline";
export * from "./query";
export * from "./search";
export * from "./transaction";
export * from "./render";
