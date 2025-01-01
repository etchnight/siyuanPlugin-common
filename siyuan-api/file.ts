import { fetchPost } from "siyuan";
import { request } from "./common";

//todo getFile比较特殊，不能使用request
export async function getFile(data: { path: string }): Promise<any> {
  const res = await new Promise((resolve, _rej) => {
    fetchPost("/api/file/getFile", data, (e) => {
      resolve(e);
    });
  });
  if (typeof res === "string") {
    return res;
  } else {
    console.error(res);
    throw new Error("获取文件失败");
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
