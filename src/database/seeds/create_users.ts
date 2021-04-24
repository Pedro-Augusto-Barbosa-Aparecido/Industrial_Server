import { Knex } from 'knex'

export async function seed (knex: Knex) {
    await knex('users').insert([
        {
             name: 'Zézinho',
             office: 'Trainee',
             is_admin: true
        },
        {
            name: 'Thaiga',
            office: 'Professional',
            is_admin: false 
        },
        {
            name: 'Felipe Neto',
            office: 'Specialist',
            is_admin: false  
        }
    ])
}