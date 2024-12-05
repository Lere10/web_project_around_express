const router = require("express").Router();
const path = require('path');
const fsPromises = require("fs").promises;

const USERS_PATH = path.join(__dirname, '../data/users.json')

router.get('/', (req,res)=>{
  fsPromises.readFile(USERS_PATH, {encoding: 'utf8'}).then((users)=>{
    res.send({data: JSON.parse(users)})
  }).catch(()=>{
    res.status(500).send({message: `Ocorreu um erro`})
  })
})

module.exports = router;
