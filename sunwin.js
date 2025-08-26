import WebSocket from "ws";
import EventEmitter from "events";
import fs from "fs";

class SunwinClient extends EventEmitter {
  constructor(authPayloadObject, authPayloadArray) {
    super();
    this.ws = null;
    this.authPayloadObject = authPayloadObject;
    this.authPayloadArray = authPayloadArray;
    this.url = "wss://api.wsktnus8.net/v2/";
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.on("open", () => {
      console.log("✅ Đã kết nối Sunwin");

      // Gửi login
      this.ws.send(JSON.stringify(this.authPayloadObject));

      // Sau 0.5s join MiniGame
      setTimeout(() => {
        this.ws.send(JSON.stringify(this.authPayloadArray));
      }, 500);

      this.emit("connected");
    });

    this.ws.on("message", (msg) => {
      try {
        const data = JSON.parse(msg.toString());

        if (Array.isArray(data) && data[2] === "diceResult") {
          const result = data[3];
          const game = (result.gameName || "").toLowerCase();

          if (game.includes("taixiu")) {
            this.emit("taixiu", result);
            fs.appendFileSync("taixiu.json", JSON.stringify(result) + "\n");
          } else if (game.includes("sicbo")) {
            this.emit("sicbo", result);
            fs.appendFileSync("sicbo.json", JSON.stringify(result) + "\n");
          } else {
            this.emit("other", result);
            fs.appendFileSync("other.json", JSON.stringify(result) + "\n");
          }
        } else {
          this.emit("raw", data);
        }
      } catch (e) {
        this.emit("raw", msg.toString());
      }
    });

    this.ws.on("close", () => {
      console.log("❌ Mất kết nối");
      this.emit("disconnected");
      // Auto reconnect sau 3s
      setTimeout(() => this.connect(), 3000);
    });

    this.ws.on("error", (err) => {
      console.error("⚠️ Lỗi:", err.message);
      this.emit("error", err);
    });
  }
}

export default SunwinClient;
