let contador = null
let lugar = ""
let pessoas = []


function gerenciador() {

    if (contador == null) {
        salvar()
    } else {
        modificar()
    }
}

//-------- PUT----------
async function modificar() {
    let campoNome = document.getElementById("nome").value
    let campoIdade = parseInt(document.getElementById("idade").value)
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
        await fetch("http://127.0.0.1:3000/put?i=" + lugar,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pessoa)
            })
        //Imprimindo a resposta da rota post no console

        console.log(" Modificado para...  " + "** " + campoNome + " **")
        // CHAMAR FUNÇÕES
        atualizarDados()
    }

    contador = null
}
/*======================================================================
                            ADICIONAR EM ARRAY - POST
========================================================================*/
async function salvar() {
    let campoNome = document.getElementById("nome").value
    let campoIdade = parseInt(document.getElementById("idade").value)
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
        await fetch("http://127.0.0.1:3000/post",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pessoa)
            })
        //Imprimindo a resposta da rota post no console

        console.log("** " + campoNome + " **" + " Adicionado...")
        // CHAMAR FUNÇÕES
        atualizarDados()
    }

}


/*======================================================================
                        MOSTAR FICHAS NA TELA - GET
========================================================================*/
async function mostarTela() {
    const res = await fetch("http://127.0.0.1:3000/get")
    pessoas = await res.json()
    let divs = ""
    // percorrer o array e criar um html para cada pessoa
    for (let i = 0; i < pessoas.length; i++) {
        divs += `
        <tr>
    <td>${pessoas[i].nome}</td>
    <td class="tb">${pessoas[i].idade}</td>
    <td class="tb">${pessoas[i].sexo}</td>
    <td><button onclick="editar(${i})"type="button" class="btn btn-primary">Edit</button></td>
    <td><button onclick="excluir(${i})" type="button" class="btn btn-danger">Del</button></td>
                          </tr>`
    }
    // imprimir o html gerado
    document.getElementById("inicio").innerHTML = divs
}
/*======================================================================
                       ATALIZAR ARRAY - PUT
========================================================================*/
async function editar(i) {

    document.getElementById("nome").value = pessoas[i].nome
    document.getElementById("idade").value = pessoas[i].idade
    document.getElementById("sexo").value = pessoas[i].sexo

    contador = 1
    lugar = i

    console.log("Editando... " + pessoas[i].nome)

}

/*======================================================================
                       REMOVER DA ARRAY - DELETE
========================================================================*/


async function excluir(i) {
    //enviar pra API via DELETE
    await fetch("http://127.0.0.1:3000/delete?i=" + i,
        {
            method: 'DELETE',
        }
    )
    console.log(pessoas[i].nome + " - removido...")
    atualizarDados()
}


/*======================================================================
                       QUANT HOMENS
========================================================================*/

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
/*======================================================================
                       QUANT MULHERES
========================================================================*/
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
/*======================================================================
                       MEDIA IDADE HOMENS
========================================================================*/
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
/*======================================================================
                       MEDIA IDADE MULHERES
========================================================================*/
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

/*======================================================================
                        LIMPAR INPUTS
========================================================================*/
function limpar() {
    document.getElementById("nome").value = ""
    document.getElementById("idade").value = ""
    document.getElementById("sexo").value = ""
}


function atualizarDados() {
    mostarTela()
    Qtd_Homens()
    Qtd_Mulheres()
    Media_Homens()
    Media_Mulheres()
    limpar()
}