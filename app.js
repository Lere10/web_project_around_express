const express = require("express");
const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.get("/", (req, res) => {
  res.send(
    "users na rota /users -- users por id através da rota /users/id -- cards na rota /cards"
  );
});

app.use("/users", usersRoute);
app.use("/cards", cardsRoute);
app.use("/cards/:id", usersRoute);

if (!PORT) {
  console.log({ message: "A solicitação não foi encontrada" });
} else {
  app.listen(PORT, () => {
    console.log(`Servidor sendo executado na porta ${PORT}`);
  });
}
