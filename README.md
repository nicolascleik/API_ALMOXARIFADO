# API Almoxarifado

> Sistema de gerenciamento de estoque e inventário desenvolvido em Node.js. O projeto utiliza uma arquitetura em camadas para garantir escalabilidade e separação de responsabilidades, integrando-se a um banco de dados MySQL.

![NodeJS](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-v5-000000?logo=express)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?logo=mysql)
![Jest](https://img.shields.io/badge/Test-Jest-C21325?logo=jest)

## Arquitetura e Design Patterns

O projeto adota uma **Arquitetura em Camadas (Layered Architecture)** para garantir a separação de responsabilidades e facilitar a testabilidade:

* **Controllers:** Gerenciam a entrada de dados e respostas HTTP. Incluem validações de regras de negócio (ex: impedir preços negativos).
* **Services:** Isolam a lógica complexa, como a geração assíncrona de relatórios em disco.
* **Repositories:** Abstraem as queries SQL, utilizando `mysql2` com **Connection Pool** para alta performance.
* **Utils:** Ferramentas auxiliares para manipulação de sistema de arquivos (`fs`).

## Estrutura de Pastas

```text
API_ALMOXARIFADO/
├── 📂 logs/                 # Arquivos de log (se configurado)
├── 📂 public/               # Front-end estático (HTML/CSS)
│   └── 📂 relatorios/       # Arquivos JSON gerados pelo sistema
├── 📂 src/
│   ├── 📂 config/           # Configuração de DB e Variáveis
│   ├── 📂 controllers/      # Lógica de requisição (ProdutoController)
│   ├── 📂 middlewares/      # Interceptadores (Logger)
│   ├── 📂 repositories/     # Acesso ao MySQL (Queries SQL)
│   ├── 📂 routes/           # Definição de endpoints
│   ├── 📂 services/         # Regras de Negócio (RelatorioService)
│   └── 📂 utils/            # Manipulação de Arquivos
├── 📂 tests/                # Testes Automatizados
├── index.js                 # Entry Point da Aplicação
└── package.json             # Dependências

```

## Instalação e Configuração

### Pré-requisitos

* Node.js (v18 ou superior)
* MySQL Server em execução

### 1. Configuração do Banco de Dados

O sistema espera uma tabela chamada `produtos`. Execute o SQL abaixo no seu banco MySQL:

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

Renomeie o arquivo `.env.example` (se houver) ou crie um arquivo `.env` na raiz com as credenciais do banco:

```ini
DB_HOST=127.0.0.1
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=almoxarifado

```

### 3. Instalação e Execução

```bash
# Instalar dependências
npm install

# Rodar a aplicação (Porta 3000)
npm start

# Rodar em modo de teste (Jest)
npm test

```

---

## Documentação da API

A API serve tanto arquivos estáticos (Front-end) quanto dados JSON.

### Rotas de Visualização (Front-end)

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/` | Página Inicial (`index.html`). |
| `GET` | `/estoque` | Visualização de estoque (`estoque.html`). |
| `GET` | `/atualizarProdutos` | Interface para deleção (`deletarProduto.html`). |

### Rotas de Produtos (JSON)

#### 1. Listar Produtos

Retorna todos os itens cadastrados no banco.

* **URL:** `/produtos`
* **Método:** `GET`
* **Sucesso:** `200 OK`

#### 2. Adicionar Produto

Cadastra um novo item. Valida se preço e quantidade são números positivos.

* **URL:** `/adicionar`
* **Método:** `POST`
* **Body (JSON):**
```json
{
  "produto": "Cadeira Gamer",
  "preco": 850.50,
  "quantidade": 10
}

```



#### 3. Remover Produto

Remove um item pelo ID.

* **URL:** `/deletar`
* **Método:** `POST`
* **Body (JSON):**
```json
{
  "id": 1
}

```



#### 4. Gerar Relatório

Calcula o valor total do estoque, salva um arquivo JSON timestampado na pasta `public/relatorios` e inicia o download automático.

* **URL:** `/relatorio`
* **Método:** `GET`
* **Resposta:** Download de arquivo `.json`.

---

## Qualidade e Testes

O projeto conta com uma suíte de **Testes de Integração** utilizando **Jest** e **Supertest**, cobrindo os fluxos críticos da aplicação.

### Cobertura Atual: ~71%

Os testes validam cenários de sucesso e erro, incluindo:

* Criação de produtos com dados válidos.
* Bloqueio de preços negativos ou tipos de dados incorretos (Status 400).
* Tentativa de deleção de IDs inexistentes (Status 404).
* Geração e download de relatórios.

Para gerar o relatório de cobertura completo:

```bash
npm run test:coverage

```

---

## Stack Tecnológico

* **Backend:** Node.js + Express v5.
* **Banco de Dados:** MySQL (Driver `mysql2` com Connection Pool).
* **Testes:** Jest + Supertest (Suporte a ES Modules).
* **Outros:** Dotenv (Variáveis de ambiente), File System (fs/promises).

---

Desenvolvido por **Nicolas Cleik de andrade** como parte do desafio de estudos "Hard Mode" em Desenvolvimento de Software.

```