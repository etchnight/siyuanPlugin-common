import { request } from "./common";
import { IOperation, IProtyle } from "siyuan";
import { TransactionRes } from "./block";

/**
 * @deprecated 该方法仅在后端进行操作，前段不产生对应变化
 * @param protyle 
 * @param transactions 
 * @returns 
 */
export async function transactions(
  protyle: IProtyle,
  transactions: [{ doOperations: IOperation[]; undoOperations: IOperation[] }]
): Promise<TransactionRes> {
  const reqData = {
    transactions,
    app: protyle.app.appId,
    reqId: new Date().getTime(),
    session: protyle.id,
  };
  return request("/api/transactions", reqData);
}
