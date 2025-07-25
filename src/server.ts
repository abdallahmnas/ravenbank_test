import express, { Request, Response, NextFunction } from "express";
const app = express();
import cors from "cors";
import errorHandler from "./middlewares/handlers/error";
import Config from "./utils/config";
const expressfile = require("express-fileupload");

const port = Config.serverPort;

app.use(expressfile());

app.use(cors());
app.use(express.json()); //{ limit: "50mb" }
app.use(express.urlencoded({ extended: true })); //{ extended: true, limit: "50mb" }

app.use((req, res, next) => {
  Log.success(
    `Incoming Request Method: [${req.method}] - URL: [${req.url}] - Ip: [${req.socket.remoteAddress}]`
  );
  res.on("finish", () => {
    Log.success("Request Finished With Status Code: " + res.statusCode);
  });
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Raven Service");
});

app.get("/health", async (req: Request, res: Response) => {
  const data: any = {};
  data.date = new Date();

  try {
    data.uptime = process.uptime();
    data.server = "Ok";

    res.status(200).send(data);
  } catch (error: any) {
    data.server = "Error";
    res.status(500).send(data);
  }
});
import routesV1 from "./routes/v1";
import Log from "./utils/loggers";

app.use(`/v1`, routesV1);

app.get(`/ping`, (req: Request, res: Response) => {
  res.status(404).send({ success: false, message: "Am alive" });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  // console.log(req?.originalUrl);
  res.status(404).send({ success: false, message: "Page not found" });
});

// attach error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  // redis c;
  Log.info("Server is running on port " + port);
});
