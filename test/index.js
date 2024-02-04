"use strict";
const fs = require('fs')
const { Auth } = require('./auth')
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
        init.body = JSON.stringify(data);
    }
    const res = await fetch(url, init);
    const res2 = (await res.json());
    //processMessage(res2);
    //console.log(res2)
    return res2;
};

async function test() {
    const res = await fetchSyncPost("/api/outline/getDocOutline", {
        id: "20230329233560-dc21eap",
    });
    let res2 = JSON.stringify(res)
    console.log(res);
    fs.writeFileSync('./test/result.json', res2)
}

test();