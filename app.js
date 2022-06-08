const express= require('express')
const app= express()

app.get('/',  (req , res)=>{
    console.log('Peticion recibida')
    res.send('<h1>hola mundo <br>Soy Cristian Albeiro Riaño Chunza</br></h1>')
})

const PORT= process.env.PORT || 4000

app.listen(4000,()=>{
    console.log('Servidor escuchando el el puerto 4000')
})