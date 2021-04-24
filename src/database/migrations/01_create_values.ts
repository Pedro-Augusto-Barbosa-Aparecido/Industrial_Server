import { Knex } from 'knex'

export async function up (knex: Knex) {
    return knex.schema.createTable('values', (table) => {
        table.integer('id_sensor').notNullable().references('id_sensor').inTable('sensors')
        table.double('value').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('values')
}