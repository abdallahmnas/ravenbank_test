import dotenv from "dotenv";
dotenv.config();

const Config = {
  serverPort: Number(process.env.PORT) ?? 4040,
  bcryptSalt: 10,
  refLength: Number(process.env.REFERENCE_LENGTH) ?? 12,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtTokenExpire: process.env.TOKEN_EXPIRY as string,
  jwtAdminSecret: process.env.JWT_ADMIN_SECRET as string,
  environment: process.env.SERVER_ENVIRONMENT as string,

  database: {
    host: process.env.DB_HOST ?? "localhost",
    port: parseInt(process.env.DB_PORT as string) ?? 3306,
    name: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    dialect: process.env.DB_DIALECT ?? "mysql",
  },
  raven: {
    baseUrl: "https://integrations.getravenbank.com/v1/",
    secretKey: process.env.RAVEN_SECRET_KEY as string,
    publicKey: process.env.RAVEN_PUBLIC_KEY as string,
    webhookSecret: process.env.RAVEN_WEBHOOK_SECRET as string,
  },
};

export default Config;
