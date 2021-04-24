import express from 'express'
import SensorController from './controllers/SensorController'
import UserController from './controllers/UserController'

const sensorController = new SensorController()
const userController = new UserController()

const routes = express.Router()

routes.get('/', (request, response) => {
    return response.json({
        author: 'Pedro Augusto Barbosa Aparecido',
        nikename_git: 'Pedro-Augusto-Barbosa-Aparecido'
    })
})

// SENSORS ROUTES
routes.get('/sensors/list-all/', sensorController.list_all)
routes.get('/sensors/get-all-value/', sensorController.get_all_values)
routes.get('/sensors/list-one-sensor/:id_sensor', sensorController.list_determinate)
routes.get('/sensors/get-value-by-sensor/:id_sensor', sensorController.get_values_by_sensor)
routes.post('/sensors/create/', sensorController.register_sensor)
routes.post('/sensors/insert-value/', sensorController.insert_values)
routes.delete('/sensors/delete/:id_sensor', sensorController.remove_sensor)

// USERS ROUTES
routes.get('/users/get-user/:user_id', userController.list_user_by_id)
routes.get('/users/get-all/', userController.list_all_users)
routes.post('/users/create/', userController.create_user)
// routes.post('/users/update-user/:user_id', userController.update_user)
routes.delete('/users/delete-user/:user_id', userController.delete_user)

export default routes
