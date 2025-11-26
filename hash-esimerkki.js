const bcrypt = require('bcrypt')

const password = "joulu"
const saltRounds = 12 // tai cost, tai costFactor myös käytetty

async function hashPassword(){
const hashed = await bcrypt.hash(password,saltRounds) //tarvitsee await

console.log(hashed) //ajetaan vasta kun hashaus tehty
}

hashPassword()
