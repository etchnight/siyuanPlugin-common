import { request } from "./common";
import { BlockId } from "../types/siyuan-api";

export async function setBlockAttrs(data: {
  id: BlockId;
  attrs: {
    name?: string;
    alias?: string;
    memo?: string;
    [customKey: string]: string | undefined;
  };
}): Promise<null> {
  /*   let data2 = {
    id: data.id,
    attrs: {},
  };
  for (let key of Object.keys(data.attrs)) {
    if (!(key in ["id", "updated"])) {
      data2.attrs[key] = data.attrs[key];
    }
  } */
  return request("/api/attr/setBlockAttrs", data);
}

export async function getBlockAttrs(data: { id: BlockId }): Promise<{
  id: BlockId;
  [key: string]: string;
}> {
  return request("/api/attr/getBlockAttrs", data);
}
