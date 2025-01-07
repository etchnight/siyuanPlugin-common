import { fetchPost, IObject } from "siyuan";
import { request } from "./common";

//* 获取文件，Json会被解析为对象，其他文件会读取为字符串
export async function getFile(data: { path: string }) {
  const res = await new Promise((resolve, _rej) => {
    fetchPost("/api/file/getFile", data, (e) => {
      resolve(e);
    });
  });
  if (typeof res === "string" || data.path.endsWith(".json")) {
    return res as string | IObject;
  } else {
    console.error(res);
  }
}

export async function putFile(data: {
  path: string;
  isDir: boolean;
  modTime?: number;
  file?: File;
}): Promise<null> {
  const formData = new FormData();
  formData.append("path", data.path);
  formData.append("isDir", String(data.isDir));
  if (!data.modTime) {
    //data.modTime = Math.round(new Date().getTime() / 1000); // 默认当前时间
    data.modTime = new Date().getTime();
  }
  formData.append("modTime", String(data.modTime));
  if (data.file) {
    formData.append("file", data.file);
  }
  //todo 无file，isDir为false时的处理
  return request("/api/file/putFile", formData);
}

export async function removeFile(data: { path: string }): Promise<null> {
  return request("/api/file/removeFile", data);
}

export async function renameFile(data: {
  path: string;
  newPath: string;
}): Promise<null> {
  return request("/api/file/renameFile", data);
}

export async function readDir(data: { path: string }): Promise<
  {
    isDir: boolean;
    isSymlink: boolean;
    name: string;
    updated: number;
  }[]
> {
  return request("/api/file/readDir", data);
}
