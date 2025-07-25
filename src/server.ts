import express, { Request, Response, NextFunction } from "express";
const app = express();
import sequelize from "./models";
import cors from "cors";
import errorHandler from "./middlewares/handlers/error";
import Config from "./utils/config";
const expressfile = require("express-fileupload");

const port = Config.serverPort;

app.use(expressfile());

app.use(cors());
app.use(express.json()); //{ limit: "50mb" }
app.use(express.urlencoded({ extended: true })); //{ extended: true, limit: "50mb" }
// app.use(morgan("dev"));

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
  res.send("Welcome to QuickFIll Service");
});

app.get("/health", async (req: Request, res: Response) => {
  const data: any = {};
  data.date = new Date();

  try {
    // Check Sequelize database connection
    // await dbClient.authenticate();//Old
    await sequelize.authenticate();
    data.database = "Ok";
  } catch (error) {
    data.database = "Error";
  }

  try {
    // Check Redis connection
    // await redisClient.ping();
    // data.redis = "Ok";
  } catch (error) {
    data.redis = "Error";
  }

  try {
    data.uptime = process.uptime();
    data.server = "Ok";
    // data.sequelize = "Connection to Sequelize database is healthy";
    // data.redis = "Connection to Redis is healthy";

    res.status(200).send(data);
  } catch (error: any) {
    data.server = "Error";
    res.status(500).send(data);
  }
});
import routesV1 from "./routes/v1";
import Log from "./utils/loggers";
import knex from "./db/knex_db";
import userRepository from "./repositories/user.repository";

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

const syncOptions =
  Config.environment !== "production" ? { alter: true } : { alter: true };

app.listen(port, () => {
  // redis c;
  Log.info("Server is running on port " + port);
});
// sequelize.sync(syncOptions).then(() => {
//   app.listen(port, () => {
//     // redis c;
//     Log.info("Server is running on port " + port);
//   });
// });
