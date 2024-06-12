# Nest Forum API
Uma aplicação backend, utilizando Nest Js com TypeScript, para criação de um fórum de perguntas e respostas. Esse projeto aborda conceitos de clean code, arquitetura limpa, DDD e eventos de domínio. Aborda também upload de anexos nas perguntas e respostas, utilizando o SDK da AWS para um bucket no S3.

 ## Tecnologias

 Esse projeto foi desenvolvido com as seguintes tecnologias:

 - [Nest JS](https://nestjs.com/) 
 - [Node JS](https://nodejs.org/en)
 - [Prisma ORM](https://www.prisma.io/?via=start&gad_source=1)
 - [Vitest](https://vitest.dev/)
 - [Zod](https://zod.dev/)
 - [Supertest](https://www.npmjs.com/package/supertest)
 - [Typescript](https://www.typescriptlang.org/)

 ## Como rodar o projeto.
 Para conseguir executar esse projeto em sua máquina, é necessário seguir os seguintes passos

 1 - Instalar as dependências

 ```bash
    npm install
```

 2 - Criar o banco de dados utilizando o docker compose 

 ```bash
    docker compose up -d
```

 3 - Inserir as migrations dos bancos de dados.

 ```bash
    npx prisma migrate dev
```

 5- Para rodar a aplicação e consumir as rotas em modo watch, rode o seguinte comando:

 ```bash
    npm run start:dev
```


 6- Para rodar os testes unitários, rode o seguinte comando:

 ```bash
    npm run test
```

 6- Para rodar os testes end-to-end (CUIDADO: Pode demorar um pouco), rode o seguinte comando:

 ```bash
    npm run test:e2e
```

 7- Para verificar o coverage de testes, rode o seguinte comando: 

 ```bash
    npm run test:cov
```

## Dúvidas
Se tiver alguma dúvida ou sugestão para esse projeto, pode criar alguma issue ou então entrar em contato direto comigo aqui no GitHub ou então no Linkedin (Está na descrição do meu perfil).