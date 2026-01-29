import express from "express";
import {getProdutos, addProduto, getRelatorio, deletarProduto} from "./config/db.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", async (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

app.get("/estoque", async (req, res) =>{
    res.sendFile(__dirname + "/estoque.html")
})

app.get("/atualizarProdutos", async (req, res) =>{
    res.sendFile(__dirname + "/deletarProduto.html")
})

app.get("/produtos", async (req, res) =>{
    const result = await getProdutos();
    res.send(result);
});

app.get("/relatorio", async (req, res) =>{
    const result = await getRelatorio();
    const today = new Date()

    const jsonContent = JSON.stringify(result, null, 1);
    const file_path = path.join(__dirname, `relatorios/relatorio_${today.getFullYear()}_${today.getMonth()}_${today.getDay()}_${today.getHours()}_${today.getMinutes()}.json`)
    
    fs.writeFile(file_path, jsonContent, 'utf8', (error) =>{
        if(error){
            console.error('Error writing file:', error);
            return res.status(500).send('Error saving JSON file');
        }
        console.log('Data written to output.json');
        res.send('JSON file successfully saved to server disk.');
    })
    
    res.json(result)
});

app.post("/deletar", async (req, res) =>{
    const id = req.body.id;

    await deletarProduto(id);
    res.redirect('/atualizarProdutos');
})

app.post("/adicionar", async (req, res) =>{
    const produto = req.body.produto;
    const preco = req.body.preco;
    const quantidade = req.body.quantidade;

    await addProduto(produto, quantidade, preco);
    //res.json(informacoes); -> vai abrir o json
});

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}/`);
})