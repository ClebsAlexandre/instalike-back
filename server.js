import express from "express";
// Importa o framework Express para criar a aplicação web
import routes from "./src/routes/postroutes.js";

const app = express();
// Cria uma instância do Express para iniciar a aplicação
app.use(express.static("uploads"))

routes(app)

app.listen(3000, () => {
    console.log("Servidor escutando...");
});
// Inicia o servidor na porta 3000 e exibe uma mensagem no console





