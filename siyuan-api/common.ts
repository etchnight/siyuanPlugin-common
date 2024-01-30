import { type IWebSocketData, fetchSyncPost } from "siyuan";

export async function request(url: string, data: any) {
  let response: IWebSocketData = await fetchSyncPost(url, data);
  if (response.code !== 0) {
    console.warn(response);
  }
  let res = response.code === 0 ? response.data : null;
  return res;
}
