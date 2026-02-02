import {app} from "../../index.js";
import request from "supertest";
import pool from "../../src/config/database.js";

describe("Testando caso de deleção de produtos", () => {
    afterAll(async () => {
        await pool.end();
    })
    
    it("Deletando produto criado", async () =>{
        const produtoTemporario = {
            produto: "Produto Para Deletar",
            preco: 10,
            quantidade: 1
        };

        const respostaCriacao = await request(app)
            .post("/adicionar")
            .send(produtoTemporario);


        const idParaDeletar = respostaCriacao.body.id;
        
        const resposta = await request(app)
            .post("/deletar")
            .send({id: idParaDeletar})
        
        expect(resposta.statusCode).toBe(200);
        expect(resposta.body.message).toBe("Deletado com sucesso");
    });

    it("deve retornar 404 ao tentar deletar um ID inexistente", async () => {
        const idImaginario = 999999;

        const resposta = await request(app)
            .post("/deletar")
            .send({ id: idImaginario });

        expect(resposta.statusCode).toBe(404);
        expect(resposta.body.error).toBe("Produto não encontrado para deleção.");
    })
})