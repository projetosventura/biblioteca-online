const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');  // Importando o CORS middleware
const app = express();
const bookRoutes = require('./routes/book-Routes');


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',  // Especificando a versão do OpenAPI
        info: {
            title: 'Biblioteca Virtual API',
            version: '1.0.0',
            description: 'API para cadastro e gerenciamento de livros',
        },
        servers: [
            {
                url: 'http://localhost:3000',  
            },
        ],
    },
    apis: ['./routes/*.js'],  
};

// Inicializando o middleware CORS
app.use(cors());  

// Configuração do Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Outros Middlewares
app.use(express.json());  // Middleware para aceitar JSON no body das requisições

// Configuração das rotas de livros
app.use('/api/books', bookRoutes);

// Iniciando o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
    console.log('Swagger docs disponíveis em http://localhost:3000/api-docs');
});
