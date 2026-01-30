import { getRelatorio } from "../repositories/ProdutoRepository.js";
import { salvarJsonEmDisco } from "../utils/ArquivoUtil.js";

export async function processarRelatorio(){ 
    const dados = await getRelatorio();

    const caminhoArquivo = await salvarJsonEmDisco(dados, "relatorio_estoque");
    return caminhoArquivo;
}