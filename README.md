# Tripleten web_project_around_express

Sprint 16

- Servidor node com express com arquivos JSON para dados de cards e users para projeto Around the US. Banco de dados via MongoDB.
  (https://github.com/Lere10/web_project_around_react)

Rotas:
http://localhost:3000

Requisições para users:
GET http://localhost:3000/users (buscar todos os usuários)
GET http://localhost:3000/users/:id (buscar usuário por id)
POST http://localhost:3000/users (criar usuário)
PATCH http://localhost:3000/users/me (atualizar perfil)
PATCH http://localhost:3000/users/me/avatar (atualizar avatar)

Requisições para card:
GET http://localhost:3000/cards (buscar cards)
POST http://localhost:3000/cards (criar novo card)
DELETE http://localhost:3000/cards (deletar card por id)
PUT http://localhost:3000/cards/:cardId/likes (funcionalidade de dar like no card)
DELETE http://localhost:3000/cards/:cardId/likes (dislike no card)
