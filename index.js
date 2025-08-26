import SunwinClient from "./sunwin.js";

// ⚠️ Cập nhật lại token + userId mới mỗi lần login
const authPayloadObject = {
  ipAddress: "2001:ee0:1a1c:1ef6:28d3:a144:c659:7ace",
  wsToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW5kZXIiOjAsImNhblZpZXdTdGF0IjpmYWxzZSwiZGlzcGxheU5hbWUiOiJfX19faG90Ym9pel9fazgiLCJib3QiOjAsImlzTWVyY2hhbnQiOmZhbHNlLCJ2ZXJpZmllZEJhbmtBY2NvdW50IjpmYWxzZSwicGxheUV2ZW50TG9iYnkiOmZhbHNlLCJjdXN0b21lcklkIjoyOTE4NTA3NDgsImFmZklkIjoic3Vud2luIiwiYmFubmVkIjpmYWxzZSwiYnJhbmQiOiJzdW4ud2luIiwidGltZXN0YW1wIjoxNzU2MjA3MTY2MzU0LCJsb2NrR2FtZXMiOltdLCJhbW91bnQiOjAsImxvY2tDaGF0Ijp0cnVlLCJwaG9uZVZlcmlmaWVkIjp0cnVlLCJpcEFkZHJlc3MiOiIyMDAxOmVlMDoxYTFjOjFlZjY6MjhkMzphMTQ0OmM2NTk6N2FjZSIsIm11dGUiOnRydWUsImF2YXRhciI6Imh0dHBzOi8vaW1hZ2VzLnN3aW5zaG9wLm5ldC9pbWFnZXMvYXZhdGFyL2F2YXRhcl8xMi5wbmciLCJwbGF0Zm9ybUlkIjoxLCJ1c2VySWQiOiI4NDM3YjQ5NS1jYzgzLTQ4NWEtYWZmNC1hNmRjZmU5YjVlODkiLCJyZWdUaW1lIjoxNzUzMTk4NDI1ODIwLCJwaG9uZSI6Ijg0ODM5NTAwNTgxIiwiZGVwb3NpdCI6dHJ1ZSwidXNlcm5hbWUiOiJTQ191cGhhaXRyYW1rYWRhdXBoYWlkZSJ9.ltCzXVBkhU9pFovv0AIs19od423hGzmIgnawbmXm06A",
  refreshToken: "35a1b82e31a4bd9095fe4b5d8a5407.0be81dec51f4583b785f83834ef965d",
  username: "SC_uphaitramkadauphaide",
  timestamp: 1756207166355,
  signature: "56B34BA4336C0DFCEDDF51FFD70CDA7530ABED8BDB8638C44941E7A953CE8473"
};

const authPayloadArray = [
  1,
  "MiniGame",
  "SC_uphaitramkadauphaide",
  "uphaitramkadauphaide",
  {
    info: "{\"ipAddress\":\"2001:ee0:1a1c:1ef6:28d3:a144:c659:7ace\",\"userId\":\"8437b495-cc83-485a-aff4-a6dcfe9b5e89\",\"username\":\"SC_uphaitramkadauphaide\",\"timestamp\":1756207166355,\"refreshToken\":\"35a1b82e31a4bd9095fe4b5d8a5407.0be81dec51f4583b785f83834ef965d\"}",
    signature: "56B34BA4336C0DFCEDDF51FFD70CDA7530ABED8BDB8638C44941E7A953CE8473"
  }
];

const sunwin = new SunwinClient(authPayloadObject, authPayloadArray);

sunwin.on("connected", () => console.log("🔗 Đã login + join game"));

sunwin.on("taixiu", (result) => {
  console.log(`🎲 [Tài Xỉu] ${result.dice.join(" + ")} = ${result.sum} → ${result.result}`);
});

sunwin.on("sicbo", (result) => {
  console.log(`🎲 [Sicbo] ${result.dice.join(" + ")} = ${result.sum} → ${result.result}`);
});

sunwin.on("other", (result) => {
  console.log("📩 Game khác:", result);
});

sunwin.on("error", (err) => console.error("⚠️ Error:", err.message));

sunwin.connect();
