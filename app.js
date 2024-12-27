const express = require("express");
const usersRoute = require("./routes/users.js");
const cardsRoute = require("./routes/cards.js");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => console.log("Conexão com MongoDB bem-sucedida!"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

app.get("/", (req, res) => {
  res.send(
    "users na rota /users -- users por id através da rota /users/id -- cards na rota /cards"
  );
});

app.use("/users", usersRoute);
// app.use("/users/:id", usersRoute);
app.use("/cards", cardsRoute);
app.use("/cards/:id", cardsRoute);

app.use((req, res, next) => {
  req.user = {
    _id: "676bb7e1f06244e65436ae88",
  };

  next();
});

if (!PORT) {
  console.log({ message: "A solicitação não foi encontrada" });
} else {
  app.listen(PORT, () => {
    console.log(`Servidor sendo executado na porta ${PORT}`);
  });
}
