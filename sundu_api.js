
const Fastify = require("fastify");
const fastifyWebsocket = require("@fastify/websocket");
const fs = require("fs");
const path = require("path");

const fastify = Fastify({ logger: true });
const PORT = process.env.PORT || 4000;
const API_KEY = "tinh592007pq";

fastify.register(require("@fastify/cors"), { origin: true });
fastify.register(fastifyWebsocket);

// API REST: Lấy dự đoán mới nhất từ prediction_cache.json
fastify.get("/api/sunwin/latest", async (request, reply) => {
  const { key } = request.query;
  if (key !== API_KEY) {
    return reply.code(403).send({ error: "Sai key API" });
  }

  try {
    const filePath = path.resolve(__dirname, "prediction_cache.json");
    if (!fs.existsSync(filePath)) {
      return reply.send({ error: "Chưa có dữ liệu dự đoán." });
    }
    const data = await fs.promises.readFile(filePath, "utf8");
    return reply.send(JSON.parse(data));
  } catch (err) {
    return reply.code(500).send({ error: "Lỗi đọc file: " + err.message });
  }
});

// Start server
fastify.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 API SunWin đang chạy tại ${address}`);
});
