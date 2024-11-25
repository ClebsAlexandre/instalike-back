import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o middleware Multer para gerenciar uploads de arquivos
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  OptionSuccessStatus: 200
}

// Importa as funções controladoras do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

// Configura o armazenamento em disco para arquivos enviados pelo Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos carregados (pasta 'uploads/')
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ storage });

// Função para definir as rotas da aplicação
const routes = (app) => {
  // Habilita o middleware express.json para analisar o corpo das requisições JSON
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para listar posts (implementação na função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (implementação na função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware upload.single('imagem') e chama a função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem); // Rota específica para upload de imagem

  app.put("/upload/:id", atualizarNovoPost)

};

export default routes; // Exporta a função routes para uso em outros arquivos