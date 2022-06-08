require('dotenv').config()

const express= require('express')
const app= express()

app.get('/',  (req , res)=>{
    console.log('Peticion recibida')
    res.send('<h1>hola mundo <br>Soy Cristian Albeiro Riaño Chunza</br></h1><p>Ingeniero de sistemas Estudiando en UNAD</p>')
})

const PORT= process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Servidor escuchando el el puerto ${PORT}`)
})