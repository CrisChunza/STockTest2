require('dotenv').config()

const express= require('express')
const { default: mongoose } = require('mongoose')
const path= require('path')
const { next } = require('process')


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

app.get('/',  (req , res,next)=>{
    console.log('Peticion recibida')
    next();
})


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
})



app.use(express.static(path.join(__dirname, 'public')))



const PORT= process.env.PORT || 4000

//

