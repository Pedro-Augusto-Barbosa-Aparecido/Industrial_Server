import { Knex } from 'knex'

export async function seed (knex: Knex) {
    await knex('sensors').insert([
        {
             model_sensor: 'HEI373-ARD',
             is_industrial: false,
             voltage: 5.00,
             eletric_current: 1  
        },
        {
            model_sensor: 'HEI222-ARD',
            is_industrial: true,
            voltage: 5.00,
            eletric_current: 1  
        },
        {
            model_sensor: 'FSI394-ARD',
            is_industrial: false,
            voltage: 5.00,
            eletric_current: 1  
        }
    ])
}