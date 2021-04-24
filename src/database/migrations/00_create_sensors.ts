import { Knex } from 'knex'

export async function up (knex: Knex) {
    return knex.schema.createTable('sensors', (table) => {
        table.increments('id_sensor').primary()
        table.string('model_sensor', 50).notNullable()
        table.boolean('is_industrial').notNullable()
        table.double('voltage').notNullable()
        table.double('eletric_current').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('sensors')
}