const express = require("express");
const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards")


const app = express();
const { PORT = 3000 } = process.env

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);

if(!PORT){
  console.log(`Porta inválida`);
} else {
  app.listen(PORT, ()=>{
  console.log(`Servidor sendo executado na porta ${PORT}`)
})
}
