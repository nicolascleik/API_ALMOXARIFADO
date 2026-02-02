import { app } from "../../index.js";
import request from "supertest";
import pool from "../../src/config/database.js";

describe("Testando Rotas de Produtos", () => {
    afterAll(async () => {
        await pool.end();
    });
    
    it("GET /produtos deve retornar status 200", async () => {
        const resposta = await request(app).get("/produtos");
        expect(resposta.statusCode).toBe(200);
    });


    it("deve listar produtos com a estrutura correta (id, nome, preco, quantidade)", async () => {
        await request(app).post("/adicionar").send({
            produto: "Produto Para Leitura",
            preco: 20.00,
            quantidade: 5
        });

        const resposta = await request(app).get("/produtos");
        expect(resposta.statusCode).toBe(200);

        expect(Array.isArray(resposta.body)).toBe(true);
        expect(resposta.body.length).toBeGreaterThan(0);

        const item = resposta.body[0];

        expect(item).toHaveProperty("id");
        expect(item).toHaveProperty("preco");
        expect(item).toHaveProperty("quantidade");
        expect(item).toHaveProperty("nome");

    });
});