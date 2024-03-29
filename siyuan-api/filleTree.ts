import { BlockId } from "../types/siyuan-api";
import { request } from "./common";

export async function getDoc(data: {
  id: BlockId;
  startID?: BlockId;
  endID?: BlockId;
}): Promise<any[]> {
  return request("/api/filetree/getDoc", data);
}
