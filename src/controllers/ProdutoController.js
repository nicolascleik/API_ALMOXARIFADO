import { processarRelatorio } from "../services/RelatorioService.js";
import { findAll, create, deleteById, findByName } from "../repositories/ProdutoRepository.js";

export async function listar(req, res) {
    try{
        const produtos = await findAll();
        res.status(200).json(produtos);
    } catch (error){
        console.log("Error no Controller: ", error);
        res.status(500).json({ erro: "Ocorreu um erro ao buscar os produtos." });
    }
} 

export async function relatorio(req, res){
    try{
        const caminhoDoArquivo = await processarRelatorio();
            
        
        res.download(caminhoDoArquivo, (err) =>{
            if(err){
                console.error("Erro ao enviar download:", err);
                if (!res.headersSent) res.status(500).send("Erro ao baixar arquivo.");
            }
        });
    } catch(error){
        console.error("Erro no Relatório:", error);
        res.status(500).json({ erro: "Falha ao gerar relatório." });
    }
}

export async function adicionar(req, res){
    try{
        const produto = req.body.produto;
        const preco = req.body.preco;
        const quantidade = req.body.quantidade;
        
        if(!produto || !preco || !quantidade){
            return res.status(400).json({erro: "Campos obrigatórios: nome, quantidade, preco."})
        }

        if (preco < 0) {
            throw new Error("PRECO_NEGATIVO"); 
        }

        const novoId = await create(produto, quantidade, preco);

        res.status(201).json({
            mensagem: "Produto criado com sucesso",
            id: novoId,
            produto: { produto, quantidade, quantidade}
        });
    } catch (error){
        if (error.message === "PRECO_NEGATIVO") {
            return res.status(400).json({ error: "O preço não pode ser menor que zero." });
        }
        console.error(error);
        return res.status(500).json({ error: "Erro ao cadastrar produto." });
    }
}

export async function remover(req, res){
    try{
        const id = req.body.id;

        const resultado = await deleteById(id);

        if (resultado.affectedRows === 0){
            return res.status(404).json({ erro: "Produto não encontrado para deleção." });
        }

        //res.redirect('/atualizarProdutos');
        res.status(200).json({ message: "Deletado com sucesso" });
    } catch (error){
        console.error(error);
        return res.status(500).json({ erro: "Erro ao remover produto." });
    }
}

export async function buscar(req, res){
    try {
        const {name} = req.query;
        const resultados = await findByName(nome);

        if (!resultados || resultados.length === 0){
            return res.status(404).json({ erro: "Nenhum produto encontrado." })
        }
        res.status(200).json(resultados);
    } catch (error){
        console.error(error);
        res.status(500).json({ erro: "Erro na busca." });
    }
}