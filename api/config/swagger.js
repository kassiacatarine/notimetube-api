const swaggerDefinition = {
  info: {
    title: 'NoTimeTube Swagger API',
    version: '1.0.0',
    description: 'Endpoints to test routes',
  },
  host: 'localhost:3000',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

module.exports = { swaggerDefinition };
