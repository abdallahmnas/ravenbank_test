import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return (
    knex.schema
      .createTable("users", (table: any) => {
        table.increments("id");
        table.string("firstName").notNullable();
        table.string("lastName").notNullable();
        table.string("email").unique().notNullable();
        table.string("phone").unique().notNullable();
        table.string("password").notNullable();
        table.string("gender").notNullable();
        table.string("state").notNullable();
        table.string("lga");
        table.string("pin");
        table.boolean("verified").defaultTo(false);
        table.string("status").defaultTo("pending");
        table.timestamps(true, true); // created_at and updated_at
      })
      // ...and another
      .createTable("wallet", (table: any) => {
        table.increments("id");
        table.string("currency").defaultTo("ngn");
        table.double("balance", 25, 2).defaultTo(0);
        table.double("prevBalance", 25, 2).defaultTo(0);
        table.string("status").defaultTo("active");
        table.integer("userId").unsigned().references("users.id");
        table.timestamps(true, true); // created_at and updated_at
      })
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users").dropTable("wallet");
}
