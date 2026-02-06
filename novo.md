# API Almoxarifado

> Sistema robusto de gerenciamento de estoque e inventário desenvolvido em Node.js, focado em organização arquitetural e validação de dados.

![NodeJS](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-v5-000000?logo=express)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?logo=mysql)
![Coverage](https://img.shields.io/badge/Coverage-71%25-yellow)
![Status](https://img.shields.io/badge/Status-Concluído-green)

## 🏗️ Arquitetura e Design Patterns




## 📂 Estrutura de Pastas

```text
API_ALMOXARIFADO/
├── 📂 logs/                 # Logs de execução
├── 📂 public/               # Interface Web e Relatórios gerados
├── 📂 src/
│   ├── 📂 config/           # Conexão com Banco de Dados (Pool)
│   ├── 📂 controllers/      # Lógica dos Endpoints
│   ├── 📂 middlewares/      # Interceptadores (Logger)
│   ├── 📂 repositories/     # Queries SQL
│   ├── 📂 routes/           # Rotas da API
│   ├── 📂 services/         # Regras de Negócio (Relatórios)
│   └── 📂 utils/            # Manipuladores de Arquivos
├── 📂 tests/                # Testes de Integração (Jest)
├── index.js                 # Entry Point
└── package.json             # Scripts e Dependências

```

## 🚀 Instalação e Configuração

### Pré-requisitos

* Node.js (v18+)
* MySQL Server

### 1. Banco de Dados

Crie o schema necessário executando o SQL abaixo no seu banco MySQL:

```sql
CREATE DATABASE almoxarifado;
USE almoxarifado;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade INT NOT NULL DEFAULT 0
);

```

### 2. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```ini
DB_HOST=127.0.0.1
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=almoxarifado

```

### 3. Execução

```bash
# Instalar dependências
npm install

# Rodar a API (Porta 3000)
npm start

# Rodar Testes Automatizados
npm test

```

---

## 📡 Documentação da API

A API aceita e retorna dados em JSON, além de servir arquivos estáticos para o front-end.

### 📦 Produtos

| Método | Rota | Descrição | Payload (Exemplo) |
| --- | --- | --- | --- |
| `GET` | `/produtos` | Lista todo o estoque. | N/A |
| `POST` | `/adicionar` | Cadastra novo produto. | `{"produto": "Cadeira", "preco": 100, "quantidade": 5}` |
| `POST` | `/deletar` | Remove produto por ID. | `{"id": 1}` |

### 📊 Relatórios e Utilitários

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/relatorio` | Gera um JSON do estoque atual, salva em disco e inicia o download. |
| `GET` | `/` | Acessa a interface visual principal (`index.html`). |



---

## 🛠️ Stack Tecnológico

* **Runtime:** Node.js
* **Framework:** Express v5
* **Database:** MySQL (Driver `mysql2/promise`)
* **Testes:** Jest, Supertest, Cross-Env
* **Utils:** Dotenv

---

Desenvolvido por **Nicolas Cleik** 🚀

```

```