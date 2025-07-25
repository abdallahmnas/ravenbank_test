const knexModule = require("knex");
const knexConfig = require("../../knexfile");
const knex = knexModule(
  knexConfig.development
  //     {
  //   client: "mysql",
  //   connection: {
  //     host: "127.0.0.1",
  //     port: 3306,
  //     user: "root",
  //     password: "",
  //     database: "raven_pay",
  //   },
  // }
);
const connectKnex = async () => {
  try {
    // Create a table
    await knex.schema
      .createTable("users", (table: any) => {
        table.increments("id");
        table.string("firstName");
      })
      // ...and another
      .createTable("accounts", (table: any) => {
        table.increments("id");
        table.string("account_name");
        table.integer("user_id").unsigned().references("users.id");
      });

    // Then query the table...
    // const insertedRows = await knex("users").insert({ firstName: "Tim" });

    // // ...and using the insert id, insert into the other table.
    // await knex("accounts").insert({
    //   account_name: "knex",
    //   user_id: insertedRows[0],
    // });

    // // Query both of the rows.
    // const selectedRows = await knex("users")
    //   .join("accounts", "users.id", "accounts.user_id")
    //   .select("users.user_name as user", "accounts.account_name as account");

    // map over the results
    // const enrichedRows = selectedRows.map((row: any) => ({
    //   ...row,
    //   active: true,
    // }));
    console.log("Created");
    // Finally, add a catch statement
  } catch (e) {
    console.error(e);
  }
};
export default knex;
