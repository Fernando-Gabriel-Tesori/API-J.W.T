Projeto de API RESTful com Node.js, Express, Sequelize e Multer
Este projeto é uma aplicação backend desenvolvida utilizando Node.js e Express, com integração ao Sequelize para manipulação de banco de dados e Multer para upload de arquivos. O objetivo principal é fornecer uma API RESTful para gerenciar usuários e produtos.

Tecnologias Utilizadas
Node.js: Plataforma de desenvolvimento.
Express: Framework para construção de aplicações web.
Sequelize: ORM para banco de dados.
Multer: Middleware para upload de arquivos.
UUID: Biblioteca para geração de IDs únicos.
Yup: Biblioteca para validação de dados.
bcrypt: Biblioteca para hashing de senhas.

Usei o docker para virtualizar um banco de dados.
Beekeeperpara fazer alterações no banco de dados.
E o HTTpie para a injeção de dados em json só revizar.

aviso pode funcionar no meu, esse prototipo não tem o deploy correto vou atualizar em um repositorio separado.

possivelmente separei para que tenha reaproveitamento das tecnologias no futuro.

1. clone
2.  instale
cd seu-repositorio
npm install

3. Configuração do banco de dados:
Edite o arquivo src/config/database.js com as configurações do seu banco de dados Postgres: (aviso: uso de docker e do beekeeper pesquise não seja preguiçoso).

Edite o arquivo src/config/database.js com as configurações do seu banco de dados Postgres:

javascript
Copiar código
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'devburguer',
  define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
  },
};

config/database.js 

quer saber como usa a api no back? pesquisa e use.
nem pense roubar minha app pt1.


PT2 não usei a atualização do git para que tenha um reaproveitamento de camadas de conhecimento

md5 hash generate


# API J.W.T

Uma API para gerenciamento de produtos e categorias, utilizando JWT para autenticação e Sequelize para interagir com o banco de dados.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para construção de APIs em Node.js.
- **Sequelize**: ORM para interagir com bancos de dados SQL.
- **Yup**: Biblioteca para validação de dados.
- **jsonwebtoken (JWT)**: Biblioteca para criação e verificação de tokens JWT.
- **Multer**: Middleware para manipulação de uploads de arquivos.

## Funcionalidades

- **Usuários**:
  - Criação de novos usuários.
  - Autenticação de usuários com JWT.

- **Produtos**:
  - Criação e listagem de produtos.
  - Relacionamento entre produtos e categorias.

- **Categorias**:
  - Criação e listagem de categorias.

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd seu-repositorio
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Configure o banco de dados no arquivo `config/database.js`.

5. Rode as migrações para configurar o banco de dados:

    ```bash
    npx sequelize-cli db:migrate
    ```

## Uso

1. Inicie o servidor:

    ```bash
    npm start
    ```

2. A API estará disponível em `http://localhost:3001`.

## Endpoints

### Usuários

- **POST /users**: Cria um novo usuário.
- **POST /session**: Autentica um usuário e retorna um token JWT.

### Produtos

- **POST /products**: Cria um novo produto. Requer autenticação.
- **GET /products**: Lista todos os produtos. Requer autenticação.

### Categorias

- **POST /category**: Cria uma nova categoria. Requer autenticação.
- **GET /category**: Lista todas as categorias. Requer autenticação.

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis:

## Testando a API com Insomnia

Insomnia é uma ferramenta poderosa para testar APIs RESTful. Aqui estão as etapas para configurar e testar a sua API usando Insomnia:

### Configuração do Insomnia

1. **Baixe e Instale o Insomnia**

   Se ainda não o fez, baixe e instale o Insomnia a partir do [site oficial](https://insomnia.rest/download).

2. **Crie um Novo Projeto**

   Abra o Insomnia e crie um novo projeto clicando no botão `New` e selecionando `Request Collection`.

3. **Adicione um Novo Recurso de Request**

   Dentro do seu projeto, clique no botão `New Request` para adicionar uma nova requisição. Dê um nome a ela e selecione o tipo de requisição (GET, POST, etc.).

### Testando Endpoints

#### Usuários

- **Criar Usuário**
  - **Método**: `POST`
  - **URL**: `http://localhost:3001/users`
  - **Body**: `JSON`
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "yourpassword"
    }
    ```

- **Autenticar Usuário**
  - **Método**: `POST`
  - **URL**: `http://localhost:3001/session`
  - **Body**: `JSON`
    ```json
    {
      "email": "john.doe@example.com",
      "password": "yourpassword"
    }
    ```

  - **Resposta**:
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "admin": false,
      "token": "your_jwt_token"
    }
    ```

#### Produtos

- **Criar Produto**
  - **Método**: `POST`
  - **URL**: `http://localhost:3001/products`
  - **Autorização**: `Bearer <your_jwt_token>`
  - **Body**: `Multipart Form`
    - **Chave**: `file` (enviar um arquivo, se necessário)
    - **Chave**: `name` (valor: nome do produto)
    - **Chave**: `price` (valor: preço do produto)
    - **Chave**: `category` (valor: ID da categoria)

- **Listar Produtos**
  - **Método**: `GET`
  - **URL**: `http://localhost:3001/products`
  - **Autorização**: `Bearer <your_jwt_token>`

#### Categorias

- **Criar Categoria**
  - **Método**: `POST`
  - **URL**: `http://localhost:3001/category`
  - **Autorização**: `Bearer <your_jwt_token>`
  - **Body**: `JSON`
    ```json
    {
      "name": "Electronics"
    }
    ```

- **Listar Categorias**
  - **Método**: `GET`
  - **URL**: `http://localhost:3001/category`
  - **Autorização**: `Bearer <your_jwt_token>`

### Observações

- **Token JWT**: Para as requisições que requerem autenticação, você deve incluir o token JWT obtido ao autenticar um usuário. Adicione um cabeçalho `Authorization` com o valor `Bearer <your_jwt_token>`.
- **Configurações de Cabeçalho**: Certifique-se de definir o tipo de `Content-Type` apropriado para cada requisição, como `application/json` para JSON ou `multipart/form-data` para formulários com arquivos.

Com essas instruções, você pode usar o Insomnia para testar e interagir com os endpoints da API de forma eficaz.

## Testando a API com HTTPie

HTTPie é uma ferramenta de linha de comando para fazer requisições HTTP de maneira simples e intuitiva. Aqui estão as etapas para configurar e testar a sua API usando HTTPie.

É simples 

Docker

Para usar o Docker como servidor para sua aplicação, você precisa criar um arquivo Dockerfile para definir o ambiente da sua aplicação, construir uma imagem Docker a partir desse Dockerfile e, em seguida, rodar um contêiner baseado nessa imagem. Aqui está um guia passo a passo para configurar e usar Docker como servidor para uma aplicação Node.js (como a sua API):


# Use a imagem base do Node.js
FROM node:16

# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante da aplicação
COPY . .

# Exponha a porta que a aplicação irá usar
EXPOSE 3001

# Comando para rodar a aplicação
CMD [ "npm", "start" ]

# TOKEN MD% HASH GENERATOR

ir no site e usar um nome para ser o token e ele vira em tag hash aleatoria

