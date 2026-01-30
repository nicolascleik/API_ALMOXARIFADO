import pool from "../config/database.js";

export async function findAll() {
    const [result] = await pool.query("SELECT * FROM produtos");
    return result;
}

export async function create(nome, quantidade, preco){
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

export async function deleteById(idProduto) {
    const [result] = await pool.query('DELETE FROM produtos WHERE id = ?', [idProduto]);
    
    return result; 
}

export async function findByName(nomeProduto){
    const termoBusca = `${nomeProduto}%`; 
    const [result] = await pool.query(
        'SELECT * FROM produtos WHERE nome LIKE ?', 
        [termoBusca]
    );
    return result;
}

export async function modificarQuantidade(idProduto,novaQuantidade){
    const [result] = await pool.query(
        'UPDATE produtos SET quantidade = ? WHERE id = ?', 
        [novaQuantidade, idProduto]
    );
    return result;
}
