const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')

function appendToKayttajat(username,password){
    filePath = path.join(__dirname,'kayttajat.txt')
    fs.appendFileSync(filePath, `${username}\n${password}\n\n`)
}

async function saveUserToJSON(username,password){
    const file = 'users.json'
    let users = []
    //jos tiedoston on jo olemassa, haetaan olemassa olevat käyttäjät
    if (fs.existsSync(file)) //tarkistaa onko tiedosto jo olemassa
    {
        //jos löytyy, parsitaan tiedosto luettavaan muotoon
        users = JSON.parse(fs.readFileSync(file))
    }
    
    //hashataan salasana
    const hashed = await bcrypt.hash(password,12)

    // lisätään users-arryhyn uusi käyttäjä
    users.push({username,password:hashed})

    // tallennetaan users.json -tiedostoon
    fs.writeFileSync(file,JSON.stringify(users,null,2))
    console.log("users.json tallennetiin")

}

async function checkPassword(password,hash){
    const match = await bcrypt.compare(password,hash)   
    if(match){
        console.log("Salasana oikein")
        //return true;
    }
    else{
        console.log("Väärä salasana")
        //return false;
    }
    return match;
    
}

// 1) OTA FUNKTIO KÄYTTÖÖN App.js - tulostaa oliko salasana oikein vai ei
// 2) MUUTA FUNKTIOTA NIIN ETTÄ PALAUTTAA True tai False
// 3) TEE TOIMINNALLISUUS >MIKÄLI SALASANA OIKEIN, näytetään vaikka / -reitti
                        // >JOS VÄÄRIN, login sivulla näytetään lisäksi virheteksti

function loadUsers(file) {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file));
}




module.exports = {appendToKayttajat, saveUserToJSON, checkPassword, loadUsers}



    // null = 'replacer', jolla voidaan määrittää mitkä
    // JSON keyt otetaan mukaan. Jos käytetään null,
    // otetaan mukaan kaikki
    // null tilalla voisi olla vaikka ["username"]
    // tällöin password key ja value jätettäisiin tallentamatta
    // 2 = intendaatio-taso (voisi olla esim. 3 tai 4) (pretty-print)