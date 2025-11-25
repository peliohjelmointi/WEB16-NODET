const express =require('express')
const s = require('./s')
const lodash = require('lodash')
//const ff = require('./file_functions')
const fs = require('fs')

const app = express() //luodaan (initialisoidaan) express-applikaatio (expressjs.com)
const port = 3000 //määritetään portti jota käytetään

app.set('view engine','ejs') //määritetään app käyttämään ejs-template enginenä
                        // ejs oletuksena hakee ejs-tiedostot views-kansiosta

//---------MIDDLEWARE-----------------------------------
app.use(express.urlencoded( {extended: false}))
//------------------------------------------------------
// FUNKTIOT ESIMERKKEINÄ
const sitaatti =sayHello()
  
function sayHello(){
  return "HELLO"
}

//---------ROUTES (ENDPOINTS)---------------------------
app.get('/', (req, res) => {
    res.render('index',{sanonta:sayHello()})
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {    
  //res.redirect("http://taitotalo.fi")
  res.render('welcome', {kayttajanimi:req.body.username}) 
})

app.get('/save-user', (req,res)=>{
  res.render('save_user')
})

app.post('/save-user', (req,res)=>{
  const username = req.body.username
  const password = req.body.password
  //fs.appendFileSync('kayttajat.txt',`USERNAME=${username}\nPASSWORD=${password}`)
  
  // tai jos haluaa vain käyttäjänimen:
  //fs.appendFileSync('kayttajat.txt',username)
  
  //tai jos käyttää ulkopuolisesta moduulia tiedostoon kirjoittamista
  ff.appendToKayttajat(username,password)
  res.redirect('/')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})