import { fetchGet } from "siyuan";
import { BlockId } from "../types/siyuan-api";

export async function lsNotebooks(): Promise<{
  notebooks: [
    {
      id: BlockId;
      name: string;
      icon: string;
      sort: number;
      closed: false;
    },
  ];
}> {
  return new Promise((resolve, _reject) => {
    fetchGet("/api/notebook/lsNotebooks", (res) => {
      resolve(res.data);
    });
  });
}
