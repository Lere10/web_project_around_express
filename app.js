const express = require("express");
const app = express();
const { PORT = 3000 } = process.env

app.use('/')

app.listen(PORT, ()=>{
    console.log(`Servidor sendo executado em ${PORT}`)
})