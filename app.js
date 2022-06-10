require('dotenv').config()

const express= require('express')
const { default: mongoose } = require('mongoose')
const path= require('path')
const axios=require('axios')


const app= express()
mongoose
    .connect(
        `mongodb+srv://Crisch:${process.env.MONGO_DB_PASS}@development.w1ujevh.mongodb.net/${process.env.nombre_Base_Datos}?retryWrites=true&w=majority`
        )
    .then((result)=>{
        app.listen(PORT,()=>{
            console.log(`Servidor escuchando el el puerto ${PORT}`)
        })
        console.log('conexion exitosa a la base de datos')
    })
    .catch((err)=>console.log(err))
const productSchema=mongoose.Schema(
    {
    name:{type: String, required: true},
    price:Number,
    },
    { timestamps: true }

)

const Product=mongoose.model('Product', productSchema)


app.use(express.json())
app.post('/api/v1/products', (req, res, next)=>{
    const newProduct= new Product(req.body)
    
    newProduct
        .save()
        .then((result)=>{
            res.status(201).json({ok:true})
        })
        .catch((err)=> console.log(err))

        
    res.status(201).json({ok:true})
    next()
})



app.get('/',  (req , res)=>{
    console.log('Peticion recibida')
    const pokeApiBaseUrl='https://pokeapi.co/api/v2/pokemon'
    const pokemonABuscar='charmeleon'
    // .then() sirve como funcion que se debe ejecutar si todo sale bien, y el .catch sirve como funcion si ocurre algun error
    axios(`${pokeApiBaseUrl}/${pokemonABuscar}`)
        .then((axiosResponse)=>{
        
        const pokemon=axiosResponse.data
        console.log({pokemon})
        const html=`
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Learning backend and frontend</title>
            <link rel="stylesheet" href="style.css">
            <script src="index.js" defer></script>
            <!-- defer  hace que el codigo javascript se ejecute al final -->
        </head>
        <body>
            <h1 class="h1">
            hola mundo <br>Soy Cristian Albeiro Riaño Chunza</br>
            </h1>
            <p>Ingeniero de sistemas Estudiando en UNAD</p>
            <div class="form-container">
                <input type="text" id="productName" placeholder="Nombre del producto">
                <input type="number" id="productPrice" placeholder="Precio del producto">
                <button>Crear producto</button>
            </div>
            <div class="poke-card">
                <h3>${pokemon.name} traido con Server render <h3>
                <img src=${pokemon.sprites.front_default}  alt="imagen de ${pokemon.name}">
            </div>
        </body>
        `
        res.send(html)
        })
})



app.use(express.static(path.join(__dirname, 'public')))



const PORT= process.env.PORT || 4000

//

