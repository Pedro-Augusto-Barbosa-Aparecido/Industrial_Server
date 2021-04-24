import { Request, Response } from 'express'
import knex from '../database/connection'

type SensorType = {
    id_sensor: number,
    value: number
} 

type SensorByIdType = {
    sensor: Array<SensorType>
}

class SensorController {

    async list_determinate (request: Request, response: Response) {

        const { id_sensor } = request.params

        if (id_sensor) {

            try {
                const sensor = await knex('sensors').where('id_sensor', id_sensor).first()

                return response.status(200).json({
                    message: `Sensor with id: ${id_sensor} was finded with success!`,
                    sensor_selected: sensor
                })
            }

            catch {
                return response.status(400).json({ message: 'Error on the proccess!' })
            }

        }

    }

    async list_all (request: Request, response: Response) {

        try {
            const sensors = await knex('sensors').select('sensors.*')

            return response.status(200).json({
                message: 'Selection finished with success!',
                all_sensors: sensors 
            })
        } 

        catch {
            return response.status(400).json({ message: 'Server error. Not possible find the table "sensors".' })
        }

    }

    async register_sensor (request: Request, response: Response) {

        const trx = await knex.transaction()

        try {

            const { model_sensor, is_industrial, voltage, eletric_current } = request.body


            try {

                const sensorExist = await trx('sensors')
                                                .where('model_sensor', model_sensor)
                                                .first()

                if (!sensorExist) {

                    const sensor = {
                        model_sensor,
                        is_industrial, 
                        voltage,
                        eletric_current
                    }

                    const sensorCreated = await trx('sensors').insert(sensor)
                    await trx.commit()

                    return response.status(200).json({ message: `Sensor ${model_sensor} was created with success with id: ${sensorCreated[0]}` })

                }

                return response.status(400).json({ message: 'Sensor already exist!.' })

            } 

            catch {
                await trx.rollback()
                return response.status(400).json({ message: 'Proccess error on connection with database.' })
            }

        }

        catch {
            await trx.rollback()
            return response.status(400).json({ message: 'Proccess error.' })
        }

    }

    async remove_sensor (request: Request, response: Response) {
        const { id_sensor } = request.params
        const trx = await knex.transaction()

        try {
            const sensor_del = await trx('sensors').where('id_sensor', id_sensor).del()

            if (sensor_del > 0) {
                await trx.commit()
                return response.status(400).json({ message: `Sensor with id: ${id_sensor} has deleted with success!` })
            } else {
                await trx.rollback()
                return response.status(400).json({ message: `Sensor with id: ${id_sensor} has not finded or not exist!` })
            }
        }

        catch {
            await trx.rollback()
            response.status(400).json({ message: "It's happened some thing with the server" })
        }
    }

    async insert_values (request: Request, response: Response) {
        const { id_sensor, value, type_sensor } = request.body
        const trx = await knex.transaction()

        try {
            const sensorExist = await trx('sensors').where('id_sensor', id_sensor).first()
            
            if (!sensorExist) {
                await trx.rollback()
                return response.status(400).json({ message: `Sensor with id: ${id_sensor} has not finded, because this the value: ${value} was deleted!` })
            }

            const sensorValue = {
                id_sensor,
                value,
            }

            try {
                await trx.insert(sensorValue).into('values')
                await trx.commit()
            }

            catch {
                await trx.rollback()
                return response.status(400).json({ message: '222222!' })
            }

            return response.status(400).json({ message: `Value by sensor with id: ${id_sensor} was inserted with success!` })

        }

        catch {
            await trx.rollback()
            return response.status(400).json({ message: 'The server has a error!' })
        }
    }

    async get_values_by_sensor (request: Request, response: Response) {
        const { id_sensor } = request.params

        try {
            const valueSensorExist = await knex('values').where('id_sensor', id_sensor).first()

            if (!valueSensorExist) {
                return response.status(400).json({ message: `Values by sensor id: ${id_sensor} was not finded or not exist!` })
            }

            const values: SensorByIdType = await knex('values').where('id_sensor', id_sensor).select('values.*')
            
            return response.status(200).json({
                message: `Values sended by sensor with id: ${id_sensor}, was finded with success!`,
                values_sensor: values
            })
        }

        catch {
            return response.status(400).json({ message: 'Server has been a error!' })
        }
    }

    async get_all_values (request: Request, response: Response) {
        try {
            const values = await knex('values').select('values.*');

            return response.status(200).json({
                message: 'Values was find with success!',
                values_sensors: values
            })
        }

        catch {
            return response.status(400).json({ message: 'Values was not find!' })
        }
    }

}

export default SensorController
