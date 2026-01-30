import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_PASS || !process.env.DB_USER) throw new Error("Variáveis de ambiente DB_USER ou DB_PASS não definidas.")
const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME || 'almoxarifado',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log("Pool de conexões criado com sucesso")

export default pool;