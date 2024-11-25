import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin:"http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configuração para armazenamento de imagens com multer (específico para Windows)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório para salvar as imagens enviadas: 'uploads/'
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware multer utilizando a configuração 'storage'
const upload = multer({ dest: "./uploads", storage });

// Função para definir as rotas da aplicação
const routes = (app) => {
  // Habilita o parseamento de requisições no formato JSON
  app.use(express.json());
  app.use(cors(corsOptions))
  // Rota GET para listar todos os posts (implementada em postsController.js)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (implementada em postsController.js)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware 'upload.single("imagem")')
  // O parâmetro 'imagem' define o campo do formulário que conterá a imagem
  app.post("/upload", upload.single("imagem"), uploadImagem); // form-data: Key=imagem

  app.put("/upload/:id", atualizarNovoPost);
};

export default routes;