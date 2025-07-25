import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "",
      database: "raven_pay",
    },
    //  {
    //   filename: "./dev.sqlite3",
    // },
  },

  staging: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "",
      database: "raven_pay",
    },
    // pool: {
    //   min: 2,
    //   max: 10,
    // },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "",
      database: "raven_pay",
    },
    // pool: {
    //   min: 2,
    //   max: 10,
    // },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

module.exports = config;
