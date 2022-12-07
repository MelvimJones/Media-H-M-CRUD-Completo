let pessoas = []

async function listar() {

    // buscar da API
    const res = await fetch("http://127.0.0.1:3000/pessoas")

    pessoas = await res.json()

    let divs = ""

    // percorrer o array e criar um html para cada pessoa
    for (let i = 0; i < pessoas.length; i++) {

        divs += vestirHTML(pessoas[i])
    }
    // imprimir o html gerado
    document.getElementById("inicio").innerHTML = divs
}

function vestirHTML(p) {
    let vari = `<tr>
    <td>${p.nome}</td>
    <td class="tb">${p.idade}</td>
    <td class="tb">${p.sexo}</td>
    <td><button onclick="edit(${i})"type="button" class="btn btn-primary">Edit</button></td>
    <td><button onclick="excluir(${i})" type="button" class="btn btn-danger">Del</button></td>
  </tr>`
    return vari
}


let indiceSelecionado = -1

async function salvar() {
    //1)Ler todos os campos
    let campoNome = document.getElementById("nome").value
    let campoIdade = document.getElementById("idade").value
    let campoSexo = document.getElementById("sexo").value

    if (campoNome == "") {

        window.alert("Campo Nome é obrigatório!")

    } else if (campoIdade == "") {

        window.alert("Campo Idade é obrigatório!")

    } else if (campoSexo == "") {
        window.alert("Campo Sexo é obrigatório!")

    } else {
        //Montar objeto com os dados dos campos
        let pessoa = {
            nome: campoNome,
            idade: campoIdade,
            sexo: campoSexo
        }
        //enviar pra API via POST

        let response = await fetch("http://127.0.0.1:3000/pessoas",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pessoa)
            })
        //Imprimindo a resposta da rota post no console
        console.log(response.json())



    }
    //colocar os dados dentro do trecho de codigo
    let pessoaHTML = `<tr>
    <td>${campoNome}</td>
    <td class="tb">${campoIdade}</td>
    <td class="tb">${campoSexo}</td>
    
  </tr>`
    //adicionar dentro do html o trecho 
    //ler texto da div lista (pega o que já tinha)
    let divLista = document.getElementById("inicio").innerHTML

    //concatena  com o novo trecho da pessoa
    let resultadoFinal = divLista + pessoaHTML

    //adicionar no html
    document.getElementById("inicio").innerHTML = resultadoFinal

    Qtd_Homens()
    Qtd_Mulheres()
    Media_Homens()
    Media_Mulheres()
    limpar()

    /*
    //1)Ler todos os campos
    let nome = ""
    let idade = ""
    let sexo = ""
    if (indiceSelecionado == -1) {
        pessoas.push({
            nome: document.getElementById("nome").value,
            idade: parseInt(document.getElementById("idade").value, 10),
            sexo: document.getElementById("sexo").value
        })
    } else {
        pessoas.splice(indiceSelecionado, 1, {
            nome: document.getElementById("nome").value,
            idade: parseInt(document.getElementById("idade").value, 10),
            sexo: document.getElementById("sexo").value
        })
        indiceSelecionado = -1
    }
    

    tela()
    limpar()
    somaHomem()
    somaMulher()
    mediaIdHome()

    */

}
//-----------Soma Homens --------------------------------
function Qtd_Homens() {
    //------- buscar a função ----------
    fetch("http://127.0.0.1:3000/qtd-homens")
        .then(
            function (n1) {
                return (n1.json())
            }
        ).then(
            function aparecer(json) {
                Subs(json)
            }
        )
}

function Subs(json) {
    let SomaH = `<div>${json.qtd_homens}</div>`                 
    document.getElementById("quant_H").innerHTML = SomaH
    
}

//-----------Soma Mulheres --------------------------------
function Qtd_Mulheres() {
    //------- buscar a função ----------
    fetch("http://127.0.0.1:3000/qtd-mulheres")
        .then(
            function (n1) {
                return (n1.json())
            }
        ).then(
            function aparecer(json) {
                SubsM(json)
            }
        )
}

function SubsM(json) {
    let SomaM = `<div>${json.qtd_mulheres}</div>`                 
    document.getElementById("quant_M").innerHTML = SomaM
    
}

//-----------Media Idade Homens --------------------------------
function Media_Homens() {
    //------- buscar a função ----------
    fetch("http://127.0.0.1:3000/media-idade-homens")
        .then(
            function (n1) {
                return (n1.json())
            }
        ).then(
            function aparecer(json) {
                MediaH(json)
            }
        )
}

function MediaH(json) {
    let MediaH = `<div>${json.media_idade_homens}</div>`                 
    document.getElementById("media_H").innerHTML = MediaH
    
}
//-----------Media Idade Mulheres --------------------------------

function Media_Mulheres() {
    //------- buscar a função ----------
    fetch("http://127.0.0.1:3000/media-idade-mulheres")
        .then(
            function (n1) {
                return (n1.json())
            }
        ).then(
            function aparecer(json) {
                MediaM(json)
            }
        )
}

function MediaM(json) {
    let MediaM = `<div>${json.media_idade_mulheres}</div>`                 
    document.getElementById("media_M").innerHTML = MediaM
}
/*
function tela() {
    let novoCadastro = ""
    for (let i = 0; i < pessoas.length; i++) {
        novoCadastro += `<tr>
                          <td>${pessoas[i].nome}</td>
                          <td class="tb">${pessoas[i].idade}</td>
                          <td class="tb">${pessoas[i].sexo}</td>
                          <td><button onclick="edit(${i})"type="button" class="btn btn-primary">Edit</button></td>
                          <td><button onclick="excluir(${i})" type="button" class="btn btn-danger">Del</button></td>
                        </tr>`
    }
    document.getElementById("inicio").innerHTML = novoCadastro
}
function excluir(i) {

    pessoas.splice(i, 1)
    tela()
    console.log(pessoas)
}

function edit(i) {
    document.getElementById("nome").value = pessoas[i].nome
    document.getElementById("idade").value = pessoas[i].idade
    document.getElementById("sexo").value = pessoas[i].sexo

    indiceSelecionado = i
}
*/
// limpar inputs
function limpar() {
    document.getElementById("nome").value = ""
    document.getElementById("idade").value = ""
    document.getElementById("sexo").value = ""
}


/*
function somaHomem() {
    let somaH = 0
    let cont = 0
    for (let i = 0; i < pessoas.length; i++) {
        if (pessoas[i].sexo == 'm') {
            somaH = somaH + 1
        }
    }
    document.getElementById("quant_H").innerHTML = somaH
}
function somaMulher() {
    let somaH = 0
    let cont = 0
    for (let i = 0; i < pessoas.length; i++) {
        if (pessoas[i].sexo == 'f') {
            somaH = somaH + 1
        }
    }
    document.getElementById("quant_M").innerHTML = somaH
}

function mediaIdHome() {
    let soma = ""
    let somaF = null
    let media = ""
    for (let i = 0; i < pessoas.length; i++) {
        if (pessoas[i].sexo == "m") {
            soma = soma + pessoas[i].idade
            //soma += pessoas[i].idade
        }
        somaF = parseInt(soma, 10)
    }
    media = somaF / pessoas.length
    console.log(somaF)
    document.getElementById("media_H").innerHTML = media
}
*/