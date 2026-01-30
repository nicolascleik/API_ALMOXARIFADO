import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function salvarJsonEmDisco(dados, nomeBase){
    try {
        const now = new Date();
        const timestamp = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
        const nomeArquivo = `${nomeBase}_${timestamp}.json`;
        
        const pastaDestino = path.join(__dirname, `../../public/relatorios`)
        await fs.mkdir(pastaDestino, {recursive: true})

        const caminhoCompleto = path.join(pastaDestino, nomeArquivo);
        await fs.writeFile(caminhoCompleto, JSON.stringify(dados, null, 2), 'utf8');

        return caminhoCompleto
        } catch (error) {
            console.error('Error saving JSON to file:', error);
        }
}