import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // ...and another
  return knex.schema.createTable("accounts", (table: any) => {
    table.increments("id");
    table.string("accountName").defaultTo("");
    table.string("accountNumber").defaultTo("");
    table.string("bankName").defaultTo("");
    table.string("bankCode").defaultTo("");
    table.string("status").defaultTo("active");
    table.integer("userId").unsigned().references("users.id");
    table.timestamps(true, true); // created_at and updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("accounts");
}
