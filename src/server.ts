import { router } from "#src/modules/routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import morgan from "morgan";
import { Server } from "socket.io";
import { configs } from "./initializers/config.js";
import { initialize } from "./initializers/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import {
  nullResponseMiddleware,
  responseMiddleware,
} from "./middlewares/response.middleware.js";

// Initializers
await initialize();
// initialize();

const app = express();
const httpserver = http.createServer(app);
const io = new Server(httpserver, { cors: { origin: "*" } });

const PORT = configs.PORT;
app.use(
  bodyParser.json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.get("/refer/:id", (req, res) => {
  const { id } = req.params;
  const redirectUrl = `app://open.gully_teama.pp?refer_id=${id}`;
  // return res.json({ message: "Hello World" });
  return res.redirect(redirectUrl);
});

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

app.post("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api", router);

app.use(nullResponseMiddleware);
app.use(responseMiddleware);
app.use(errorHandler);

httpserver.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// default 404 route
