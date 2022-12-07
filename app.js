const express = require("express")
const cors = require("cors")
const app = express()
const port = 3000

let pessoas = []

pessoas.push(
    {
        "nome": "João Pedro",
        "idade": 10,
        "sexo": "m"
    },
    {
        "nome": "Maria Aparecida",
        "idade": 32,
        "sexo": "f"
    },
    {
        "nome": "Marcos Roberto",
        "idade": 16,
        "sexo": "m"
    },
    {
        "nome": "Pedro Henrrique",
        "idade": 22,
        "sexo": "m"
    }
)

//conectando a funcao cors com o express
app.use(cors())
//reconhecendo os request que possui json no body
app.use(express.json())

//-------------# ROTAS #-----------------

// invocando a funcao get para configurar a rota http pelo método get
app.get("/", (req, res) => {
    res.send("rodando !!!")
})

/*======================================================================
                            CREATE ARRAY - POST
========================================================================*/
app.post("/post", (req, res) => {
    //incluindo objetos no array
    pessoas.push(req.body)
    //desenvolvendo um json de resposta para o client
    res.json({ mensagem: "cadastrado com sucesso" })
})

/*======================================================================
                            READ ARRAY - GET
========================================================================*/
app.get("/get", (req, res) => {
    res.json(pessoas)
})

/*======================================================================
                            UPDATE ARRAY - PUT
========================================================================*/
app.put("/put", (req, res) => {
    let pessoa1 = req.body
    let i = req.query.i
    pessoas[i] = pessoa1
    res.json("Alterado com sucesso...")
})

/*======================================================================
                            DELETE ARRAY - DELETE
========================================================================*/
app.delete("/delete", (req, res) => {
    let i = req.query.i
    pessoas.splice(i, 1)

    res.status(200)
    res.send("removido indice:" + i)
})

/*======================================================================
                           READ DATA FROM ARRAY
========================================================================*/
//--------Quantidade de Homens -------------------
app.get("/qtd-homens", (req, res) => {
    let somaH = 0
    let saida = 0
    let cont = 0
    for (let i = 0; i < pessoas.length; i++) {
        if (pessoas[i].sexo == "m") {
            somaH += cont++
        }
    }
    saida = { qtd_homens: cont }
    res.json(saida)
})

//--------Quantidade de Mulheres -----------------
app.get("/qtd-mulheres", (req, res) => {
    let somaH = 0
    let saida = 0
    let cont = 0
    for (let i = 0; i < pessoas.length; i++) {
        if (pessoas[i].sexo == "f") {
            somaH += cont++
        }
    }
    saida = { qtd_mulheres: cont }
    res.json(saida)
})

//--------Media idade dos Homens -----------------
app.get("/media-idade-homens", (req, res) => {
    let somaH = 0
    let divisor = 0
    for (let i = 0; i < pessoas.length; i++) {
        if (pessoas[i].sexo == "m") {
            somaH += pessoas[i].idade
            divisor++
        }
    }
    let mediaH = somaH / divisor
    let saida = { media_idade_homens: mediaH }
    res.json(saida)
})

//--------Media idade das Mulheres ----------------
app.get("/media-idade-mulheres", (req, res) => {
    let somaM = 0
    let divisor = 0
    for (let i = 0; i < pessoas.length; i++) {
        if (pessoas[i].sexo == "f") {
            somaM += pessoas[i].idade
            divisor++
        }
    }
    let mediaM = somaM / divisor
    let saida = { media_idade_mulheres: mediaM }
    res.json(saida)
})


app.listen(port, () => {
    console.log(`App rodando na porta ... ${port}`)
})