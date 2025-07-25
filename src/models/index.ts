import dotenv from "dotenv";
import { Sequelize, QueryInterface } from "sequelize";
import Config from "../utils/config";
import Utils from "../utils/util";

dotenv.config();

const sequelize = new Sequelize(
  Config.database.name,
  Config.database.user,
  Config.database.password,
  {
    host: Config.database.host,
    port: Config.database.port,
    dialect: Config.database.dialect as "mysql",
    logging: false,
  }
);
sequelize.addHook("beforeUpdate", (instance) => {
  instance.setDataValue("updatedAt", Utils.currentTimestamp());
});


export default sequelize;
