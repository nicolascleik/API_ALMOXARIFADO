import { app } from "../../index.js";
import request from "supertest";
import pool from "../../src/config/database.js";

describe("Criando novo produto", () => {
    afterAll(async () => {
        await pool.end();
    });
    
    it("POST /adicionar deve retornar status 201", async () => {
        const novoProduto = {
            produto: "Produto de Teste Jest",
            preco: 50.00,
            quantidade: 10
        };
        const resposta = await request(app)
            .post("/adicionar")
            .send(novoProduto);

        expect(resposta.statusCode).toBe(201);
        expect(resposta.body).toHaveProperty("id");
        expect(resposta.body.mensagem).toBe("Produto criado com sucesso");
    });

    it("NÃO deve permitir preço negativo (400)", async () =>{
        const novoProduto = {
            produto: "Produto de Teste Jest",
            preco: -10,
            quantidade: 2
        };
        const resposta = await request(app)
            .post("/adicionar")
            .send(novoProduto)

        expect(resposta.statusCode).toBe(400);
        expect(resposta.body.error).toBe("O preço não pode ser menor que zero.");
    });

    it("NÃO deve permitir campos vazios (400)", async () =>{
        const novoProduto = {
            produto: null,
            preco: 10,
            quantidade: 10
        }
        const resposta = await request(app)
            .post("/adicionar")
            .send(novoProduto)
        
        expect(resposta.statusCode).toBe(400);
        expect(resposta.body.error).toBe("Campos obrigatórios: nome, quantidade, preco");
    });

    it("NÃO deve permitir letras no lugar de numeros (400)", async ()=>{
        const novoProduto = {
            produto: "Produto de Teste Jest",
            preco: "50.00",
            quantidade: 10
        };
        const resposta = await request(app)
            .post("/adicionar")
            .send(novoProduto);

        expect(resposta.statusCode).toBe(400);
        expect(resposta.body.error).toBe("Os campos 'preço' e 'quantidade' devem ser numeros")
    });
});