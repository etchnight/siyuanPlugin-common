"use strict";
const fs = require("fs");
const { Auth } = require("./auth");
/**
 * copy from app\src\util\fetch.ts
 */
const fetchSyncPost = async (url, data) => {
  url = "http://127.0.0.1:6806" + url;
  const init = {
    method: "POST",
    headers: {
      authorization: `Token ${Auth}`,
    },
    referrerPolicy: "strict-origin-when-cross-origin",
  };
  if (data) {
    try {
      init.body = JSON.stringify(data);
    } catch (e) {
      console.warn("输入值不是对象");
      throw e;
    }
  }
  const res = await fetch(url, init);
  const res2 = res.clone();
  let result;
  try {
    result = await res.json();
  } catch (e) {
    console.warn("返回值无法解析为json");
    throw e;
  }
  //processMessage(res2);
  //console.log(res2)
  return result;
};
const request = async (url, data) => {
  let response = await fetchSyncPost(url, data);
  if (response.code !== 0) {
    console.warn(response);
  }
  let res = response.code === 0 ? response.data : null;
  return res;
};

const getEmbedBlock = async () => {
  return request("/api/search/searchEmbedBlock", {
    embedBlockID: "20240205184718-6132dkz",
    stmt: "select * from blocks where id='20240130230704-f54ujx6'",
    headingMode: 0,
    excludeIDs: ["20240205184718-6132dkz", "20240129090734-enoz1rj"],
    breadcrumb: true,
  });
};

const main = async () => {
  let res = await getEmbedBlock();
  if (!res) {
    console.warn("无返回值");
    return;
  }
  console.log(res);
  let res2 = JSON.stringify(res);
  fs.writeFileSync("./test/result.json", res2);
};
main();
