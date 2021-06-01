<h1>
    REST API CONTELE test
</h1>

<hr>

<p>API para gerenciamento de usuários com os dados salvos em um arquivo JSON.</p>

<hr>

<h2>
    Instalação
</h2>

<hr>

<p>Após clonar o projeto use o comando no terminal:</p>

```
    npm install
```


<h2>Executando</h2>

<hr>

```
    npm start
```

<h1>Rotas</h1>

Use o path: `localhost:3333/api/v1/users` como base

<h2>Resgatar todos os usuários</h2>
<hr>


<h3>Requisição</h3>


`GET /`

<h3>Resposta</h3>
    ```
    [
    {
      "id": "mgn618fo7",
      "email": "userOne@email.com",
      "password": "userPassword1@"
    },
    {
      "id": "vl3q57i8l",
      "email": "userTwo@email.com",
      "password": "userPassword2@"
    },
    {
      "id": "mshcb27kh",
      "email": "userThree@email.com",
      "password": "userPassword3@"
    }
  ]
    ```
<h2>Resgatar um usuário específico</h2>
<hr>

<h3>Requisição</h3>


`GET /id`

<h3>Resposta</h3>

```
    {
        "id": "mgn618fo7",
        "email": "userOne@email.com",
        "password": "userPassword1@"
    }

```

<h2>Criar um novo usuário</h2>
<hr>

<h3>Requisição</h3>

`POST /`

```
    {
        "email": "userThree@email.com",
        "password": "userPassword3@"
    }
```

<h2>Resposta</h2>

```
    {
        "message": "User successfully created"
    }

```

<h2>Atualizar um usuário</h2>
<hr>


<h3>Requisição</h3>

`PUT /id`

```
    {
        "email": "userThree@email.com",
        "password": "userPassword3@"
    }
```

<h3>Resposta</h3>

```
    {
        "message": "user successfully updated"
    }
```

<h2>Deleta um usuário específico</h2>
<hr>

<h3>Requisição</h3>

`DELETE /id`

<h3>Resposta</h3>

```
    {
        "message": "user successfully deleted"
    }
```

<h2>Deleta todos os usuários</h2>
<hr>

<h3>Requisição</h3>

`DELETE /`

<h3>Resposta</h3>

```
    {
        "message": "users successfully deleted"
    }

```



