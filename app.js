const express =require('express')
const {sanonnat} = require('./s')
const lodash = require('lodash')
const ff = require('./file_functions')
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
    //res.render('index',{sanonta:sayHello()})
    res.render('index',{sanonta:lodash.sample(sanonnat)})
    const users = ff.loadUsers('users.json')
    console.log(users[0])
    console.log(users[1].password)
    // jatketaan aamulla
    // TEHTÄVÄ: käy läpi kaikki käyttäjät users.json -tiedostosta
    // ja tarkista, löytyykö käyttäjän syöttämä käyttäjä
    // 1. versioon riittää vain tieto löytyikö käyttäjä
    // tiedostosta.
})

app.get('/login', (req, res) => {      
    res.render('login',{virhe:""})
})

app.post('/login', async(req, res) => {    
  //res.redirect("http://taitotalo.fi")
  const user = req.body.username
  const hashed = "$2b$12$zz.G5HaFdTJkzeuq2n6RceeG/u0.N1DVB0aUCG6qW.TmvbiAMTJcG"
  const passwordCorrect = await ff.checkPassword(req.body.password,hashed)
  
  if (passwordCorrect==true){
    res.render('welcome', {kayttajanimi:req.body.username}) 
  }
  else{ //väärä salasana
  res.render('login',{virhe:"Virheelliset tiedot"})
  }



})
  


app.get('/save-user', (req,res)=>{
  res.render('save_user')
})

app.post('/save-user', (req,res)=>{
  const username = req.body.username
  const password = req.body.password

  ff.saveUserToJSON(username,password)
  res.redirect('/')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})