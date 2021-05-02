# Server of Industrial Monitoring 4.0

## Commands

>           To install all the dependencies run the command: 
>>                - If you have *__yarn__*: **`yarn install-dependencies`**
>>                - If you have *__npm__*: **`npm install-dependencies`**

>           To share your localhost, you have to install on the project or on your machine globally. To
>       install globally on your machine, run this command `npm i -g ngrok`, or on your project only run
>       this command: 
>>                - If you have *yarn*: ```js 
                                            yarn add -D ngrok
                                        ```
>>                - If you have *npm*: **`npm install ngrok --save-dev`**


## Routes

> - Users
>> - `/users/create/` route to create user by json body
>> - routes to search user
>>    - `/users/get-all/` get all users
>>    - `/users/get-user/:user_id` get unique user
>> - `/users/delete-user/:user_id` delete an user
>> - `/users/update-user/:user_id` update an user by id and json body, but didn't implement yet

> - Sensors
>> - `/sensors/create/` route to create sensor by json body
>> - routes to search sensor
>>    - `/sensors/list-all/` get all sensor
>>    - `/sensors/list-one-sensor/:user_id` get unique sensor
>> - routes to search value of sensor
>>    - `/sensors/get-all-value/:id_sensor` get all values
>>    - `/sensors/get-value-by-sensor/:id_sensor` get value by unique sensor
>> - `/sensors/delete/:id_sensor` delete a sensor
>> - `/sensors/insert-value/` insert the value read by sensor