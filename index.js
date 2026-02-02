import express from "express";
import produtoRoutes from "./src/routes/produtoRoutes.js"; // export default router;

import path from "path"; 
import { fileURLToPath } from "url";

import { logger } from "./src/middlewares/Logger.js";

const urlAtual = import.meta.url
const __filename = fileURLToPath(urlAtual);
const __dirname = path.dirname(__filename)

export const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);
app.use(produtoRoutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, ()=>{
        console.log(`Server is running at http://localhost:${PORT}/`);
    })
}