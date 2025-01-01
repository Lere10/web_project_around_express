const express = require("express");
const usersRoute = require("./routes/users.js");
const cardsRoute = require("./routes/cards.js");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

const MONGO_URI = "mongodb://127.0.0.1:27017/aroundb";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conexão com MongoDB estabelecida"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

app.get("/", (req, res) => {
  res.send(
    "users na rota /users -- users por id através da rota /users/id -- cards na rota /cards"
  );
});

app.use((req, res, next) => {
  req.user = {
    _id: "676bb7e1f06244e65436ae88",
  };

  next();
});

app.use("/users", usersRoute);
app.use("/cards", cardsRoute);

if (!PORT) {
  console.log({ message: "Requisition failed" });
} else {
  app.listen(PORT, () => {
    console.log(`Servidor sendo executado na porta ${PORT}`);
  });
}
