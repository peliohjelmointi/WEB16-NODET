const express =require('express')
const s = require('./s')
const lodash = require('lodash')

const app = express() //luodaan (initialisoidaan) express-applikaatio (expressjs.com)
const port = 3000 //määritetään portti jota käytetään

app.set('view engine','ejs') //määritetään app käyttämään ejs-template enginenä
                        // ejs oletuksena hakee ejs-tiedostot views-kansiosta

//---------MIDDLEWARE-----------------------------------

//---------ROUTES (ENDPOINTS)---------------------------
app.get('/', (req, res) => {
    const userAgent = req.headers['user-agent']
    console.log(userAgent)
    
    const userLocale = req.headers['accept-language']
    console.log(userLocale)
    
    //res.send('Hello World')    

    //const username = "JOULUPUKKI"

    //const randomIndex  = Math.floor(Math.random()*s.sanonnat.length)                
    //const sanonta = s.sanonnat[randomIndex]
    //const sanonta = lodash.sample(s.sanonnat)
    res.render('index',{sanonta:lodash.sample(s.sanonnat)})

    //res.render('index',{sanonta}) //hakee index.ejs-tiedoston views-kansiosta
    // tai nimetysti:
    //res.render('index',{sanonta:lodash.sample(s.sanonnat)})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})