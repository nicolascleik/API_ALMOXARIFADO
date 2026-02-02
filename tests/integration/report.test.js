import request from "supertest";
import { app } from "../../index.js";
import pool from "../../src/config/database.js";

describe("GET /relatorio", () => {
    
    afterAll(async () => {
        await pool.end();
    });

    it("deve gerar o relatório e retornar status 200", async () => {        
        const resposta = await request(app).get("/relatorio");

        expect(resposta.statusCode).toBe(200);
        expect(resposta.headers['content-type']).toContain('application/json; charset=utf-8'); 
    });
});