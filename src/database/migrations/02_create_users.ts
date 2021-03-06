import { Knex } from 'knex'

export async function up (knex: Knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id_user').primary()
        table.string('name', 255).notNullable()
        table.string('office', 255).notNullable()
        table.boolean('is_admin').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users')
}