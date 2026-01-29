import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'admin',
    database: process.env.DB_NAME || 'almoxarifado',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export async function getProdutos() {
    const [result] = await pool.query("SELECT * FROM produtos");
    return result;
}

export async function addProduto(nome, quantidade, preco){
    const [result] = await pool.query(
        'INSERT INTO produtos (nome, quantidade, preco) VALUES (?,?,?)',
        [nome,quantidade,preco]
    );
    return result.insertId;
}

export async function getRelatorio(){
    const [result] = await pool.query('SELECT SUM(preco * quantidade) FROM produtos');
    return result;
}

export async function deletarProduto (idProduto) {
    const [result] = await pool.query('DELETE FROM produtos WHERE id = ?', [idProduto]);
    
    if (result.affectedRows > 0){
        return result;
    }
    else{
        console.log("This id dont exist")
    }  
}

export async function pesquisarProduto(nomeProduto){
    const termoBusca = `${nomeProduto}%`; 
    const [result] = await pool.query(
        'SELECT * FROM produtos WHERE nome LIKE ?', 
        [termoBusca]
    );
    return result;
}

export async function modificarQuantidade(idProduto,novaQuantidade){
    if (novaQuantidade >= 0){
        const [result] = await pool.query(
            'UPDATE produtos SET quantidade = ? WHERE id = ?', 
            [novaQuantidade, idProduto]
        );
        return result;
    }
}

export default pool;
