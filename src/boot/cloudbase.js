import cloudbase from "@cloudbase/js-sdk";

let cloudbaseConfig = {
  env: process.env.CLOUDBASE_ENV_ID,
  region: "ap-shanghai",
}

let cloudbaseApp = cloudbase.init(cloudbaseConfig);

let cloudbaseAuth = cloudbaseApp.auth({
  persistence: "local" //用户显式退出或更改密码之前的30天一直有效
})
let cloudbaseDb = cloudbaseApp.database()

export {cloudbaseAuth, cloudbaseDb}
