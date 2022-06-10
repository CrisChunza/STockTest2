const inputName=document.querySelector('#productName')
const inputPrice=document.querySelector('#productPrice')

const button=document.querySelector('button')

const pokeApiBaseUrl='https://pokeapi.co/api/v2/pokemon'
const pokemonABuscar='charmander'
// .then() sirve como funcion que se debe ejecutar si todo sale bien, y el .catch sirve como funcion si ocurre algun error
fetch(`${pokeApiBaseUrl}/${pokemonABuscar}`)
    .then((res)=>{
    console.log({respuesta: res})
    return res.json()
    }).then((pokemon)=>{
        console.log({pokemon})
        const html=`
        <h3>${pokemon.name} traido desde Client Render<h3>
        <img src="${pokemon.sprites.front_default}"  alt="imagen de ${pokemon.name}">
        `

        const div = document.createElement('div')
        div.classList.add('poke-card')
        div.innerHTML=html
        
        document.querySelector('body').appendChild(div)
    })
    .catch()    


button.addEventListener('click',(e)=>{
    
    const name=inputName.value
    const price=inputPrice.value
    console.log(name, price)
    fetch('/api/v1/products',{
        method:'POST', 
        headers:{
        'Content-Type':'application/json',
        },
        body:JSON.stringify({
            name,
            price,
        })
    })
})