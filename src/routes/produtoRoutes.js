import { Router } from "express";
import { adicionar, listar, relatorio, remover } from "../controllers/ProdutoController.js";

import path from 'path'; 
import { fileURLToPath } from 'url';
 
const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", async (req, res) =>{
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get("/estoque", async (req, res) =>{
    res.sendFile(path.join(__dirname, "../../public/estoque.html"))
})

router.get("/atualizarProdutos", async (req, res) =>{
    res.sendFile(path.join(__dirname, "../../public/deletarProduto.html"))
})

router.get("/produtos", listar);

router.get("/relatorio", relatorio);

router.post("/deletar", remover)

router.post("/adicionar", adicionar);

export default router;