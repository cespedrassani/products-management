# Products Management

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![NExt.js](https://img.shields.io/badge/Next-green?style=for-the-badge)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![FakeStore API](https://img.shields.io/badge/FakeStore-API-green?style=for-the-badge)](https://fakestoreapi.com)


## 📋 Descrição

O Products Management é uma aplicação front-end desenvolvida para gerenciar produtos de uma loja virtual, utilizando a [FakeStore API](https://fakestoreapi.com) como backend. Este projeto permite visualizar, criar, editar e excluir produtos

## 🚀 Funcionalidades

### Produtos
- **Listagem de Produtos**: Visualização de todos os produtos com opções de filtragem e paginação
- **Detalhes do Produto**: Página dedicada para visualizar informações detalhadas de cada produto
- **Categorização**: Filtragem de produtos por categorias
- **Gerenciamento de Produtos**: Interface para adicionar, editar e remover produtos

## ⚙️ Tecnologias Utilizadas

### Core
- **React**: Biblioteca para construção da interface
- **TypeScript**: Superset JavaScript com tipagem estática
- **Next.Js**: Framework utilizando junto ao react para gerencimaneto de rotas e construção do projeto

### Estado e Gerenciamento de Dados
- **Context API**: Gerenciamento de estado global
- **Axios**: Cliente HTTP para comunicação com a API

### UI/UX
- **Tailwind**: Framework de componentes para interface

### Formulários e Validação
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de dados de formulários

### Testes
- **Jest**: Framework de testes
- **React Testing Library**: Utilitários para testes de componentes

## 🔌 API Integração

O projeto utiliza a [FakeStore API](https://fakestoreapi.com) para as operações CRUD. Principais endpoints utilizados:

### Produtos
- `GET /products`: Lista todos os produtos
- `GET /products/{id}`: Obtém detalhes de um produto específico
- `GET /products/category/{category}`: Lista produtos por categoria
- `GET /products/categories`: Lista todas as categorias disponíveis
- `POST /products`: Cria um novo produto
- `PUT /products/{id}`: Atualiza um produto existente
- `DELETE /products/{id}`: Remove um produto

## 🏃‍♂️ Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/cespedrassani/products-management.git
   cd products-management
   ```

2. Instale as dependências:
   ```bash
   npm install --force
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse a aplicação em [http://localhost:5173](http://localhost:5173)

## 🧪 Testes

Para executar os testes:
```bash
npm run test
```

## 🏗️ Build

Para gerar uma versão de produção:
```bash
npm run build
# ou
```

## 👨‍💻 Autor

Desenvolvido por [cespedrassani](https://github.com/cespedrassani)
