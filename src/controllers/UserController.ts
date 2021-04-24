import { Request, Response } from 'express'
import knex from '../database/connection'

type User = {
    name: string 
    office: string
    is_admin: boolean
}

type UserReturn = {
    users: Array<User>
}

type UserUpdate = {
    name: string
    office: string
    is_admin: string
}

class UserController {
    
    async create_user (request: Request, response: Response) {
        const trx = await knex.transaction()

        try {
            const { name, office, is_admin } = request.body

            try {
                const userExist = await trx('users')
                                        .where('name', name)
                                        .where('office', office)
                                        .where('is_admin', is_admin)
                                        .first()

                if (!userExist) {
                    const user = {
                        name,
                        office,
                        is_admin
                    }

                    const userCreated = await trx('users').insert(user)
                    await trx.commit()

                    return response.status(200).json({
                        message: `User ${name} was created with success!`
                    })
                }

                await trx.rollback()
                return response.status(400).json({ message: `The user with name: ${name}, office: ${office} and this user ${is_admin ? 
                                                                                            'also is administrator, and already exist him.' 
                                                                                            : 'is not an administrator, and already exist him.'
                                                                                        }` })
            }

            catch {
                await trx.rollback()
                return response.status(400).json({ message: 'It is happened an error to create a user!' })    
            }
        }

        catch {
            await trx.rollback()
            return response.status(400).json({ message: 'It is happened an error with database!' })
        }

    }

    async list_user_by_id (request: Request, response: Response) {
        const { user_id } = request.params

        try {
            const userExist: User = await knex('users').where('id_user', user_id).first()

            if (!userExist) {
                return response.status(400).json({
                    message: `The user with id: ${user_id} was not find.`
                })
            }

            return response.status(200).json({
                message: `The user with id: ${user_id} was find with success.`,
                user: userExist
            })
        }

        catch {
            return response.status(400).json({
                message: `Server has a problem!`
            })
        }

    }

    async list_all_users (request: Request, response: Response) {
        try {
            const users: UserReturn = await knex('users').select('users.*')

            if (!users) {
                return response.status(500).json({ message: 'The server does not has any user!' })
            }

            return response.status(200).json({
                message: 'Users has finded with success.',
                users_finded: users
            })
        }

        catch {
            return response.status(500).json({ message: 'The server has a problem, try after.' })
        }
    }

    // async update_user (request: Request, response: Response) {
    //     const trx = await knex.transaction()

    //     try {
    //         const { name, office, admin } = request.body
    //         const { user_id } = request.params

    //         const userExist = await knex('users').where('id_user', user_id).first().select('*')

    //         if (!userExist) {
    //             return response.status(400).json({
    //                 message: `The user with id: ${user_id} was not find.`
    //             })
    //         }

    //         if (admin) {

    //             const userAdmin = !userExist.is_admin

    //             try {

    //                 await trx('users').where('id_user', user_id).update({
    //                     name,
    //                     office,
    //                     is_admin: userAdmin
    //                 })
    //                 await trx.commit()

    //                 return response.status(200).json({
    //                     message: `The user ${userExist.name} was update with success!`
    //                 })

    //             }

    //             catch {
    //                 await trx.rollback()
    //                 return response.status(400).json({
    //                     message: `Did not possible update user ${userExist.name}`
    //                 })
    //             }

    //         } else {

    //             const userAdmin = userExist.is_admin

    //             try {
    //                 await trx('users').where('id_user', user_id).update({
    //                     name,
    //                     office,
    //                     is_admin: userAdmin
    //                 })
    
    //                 await trx.commit()
    
    //                 return response.status(200).json({
    //                     message: `The user ${userExist.name} was update with success!`
    //                 })
    
    //             }
    
    //             catch {
    //                 await trx.rollback()
    //                 return response.status(400).json({
    //                     message: `Did not possible update user ${userExist.name}`
    //                 })
    //             }

    //         }
            
    //     }

    //     catch {
    //         await trx.rollback()
    //         return response.status(400).json({
    //             message: 'Server problem!'
    //         })
    //     }
    // }

    async delete_user (request: Request, response: Response) {
        const trx = await knex.transaction()

        try {
            const { user_id } = request.params

            const userExist = await trx('users').where('id_user', user_id).del()

            if (!userExist) {
                await trx.rollback()
                return response.status(400).json({ message: `User with id: ${user_id} not exist!` })
            }

            await trx.commit()

            return response.status(200).json({ message: `User with id: ${user_id} was delete` })
            
        }

        catch {
            await trx.rollback()
            return response.status(400).json({ message: 'Server error' })
        }

    }

}

export default UserController
