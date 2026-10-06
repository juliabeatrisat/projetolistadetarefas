let tarefas = [];

let filtroAtual = "todas";

const campoTarefa = document.getElementById("tarefa");
const botaoAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");
const mensagem = document.getElementById("mensagem");
const mensagemVazia = document.getElementById("mensagemVazia");
const botaoLimpar = document.getElementById("btnLimpar");


// ADICIONAR TAREFA
function adicionarTarefa() {

    let texto = campoTarefa.value.trim();

    if (texto === "") {
        mensagem.textContent = "Digite uma tarefa antes de adicionar.";
        return;
    }

    mensagem.textContent = "";

    let novaTarefa = {
        texto: texto,
        concluida: false
    };

    tarefas.push(novaTarefa);

    campoTarefa.value = "";

    salvarTarefas();
    mostrarTarefas();
}


// MOSTRAR TAREFAS
function mostrarTarefas() {

    listaTarefas.innerHTML = "";

    let tarefasFiltradas = tarefas;

    if (filtroAtual === "pendentes") {

        tarefasFiltradas = tarefas.filter(function(tarefa) {
            return tarefa.concluida === false;
        });

    } else if (filtroAtual === "concluidas") {

        tarefasFiltradas = tarefas.filter(function(tarefa) {
            return tarefa.concluida === true;
        });
    }


    tarefasFiltradas.forEach(function(tarefa) {

        let item = document.createElement("li");

        item.className = "tarefa-item";

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }


        let conteudo = document.createElement("div");

        conteudo.className = "tarefa-conteudo";


        let checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "checkbox";

        checkbox.checked = tarefa.concluida;


        checkbox.addEventListener("change", function() {

            tarefa.concluida = checkbox.checked;

            salvarTarefas();
            mostrarTarefas();

        });


        let texto = document.createElement("span");

        texto.className = "texto-tarefa";

        texto.textContent = tarefa.texto;


        let botaoExcluir = document.createElement("button");

        botaoExcluir.className = "btnExcluir";

        botaoExcluir.textContent = "Excluir";


        botaoExcluir.addEventListener("click", function() {

            let indice = tarefas.indexOf(tarefa);

            tarefas.splice(indice, 1);

            salvarTarefas();
            mostrarTarefas();

        });


        conteudo.appendChild(checkbox);
        conteudo.appendChild(texto);

        item.appendChild(conteudo);
        item.appendChild(botaoExcluir);

        listaTarefas.appendChild(item);

    });


    atualizarContador();


    if (tarefasFiltradas.length === 0) {
        mensagemVazia.style.display = "block";
    } else {
        mensagemVazia.style.display = "none";
    }
}


// CONTADOR
function atualizarContador() {

    let pendentes = tarefas.filter(function(tarefa) {
        return tarefa.concluida === false;
    });

    contador.textContent = pendentes.length;
}


// FILTROS
let botoesFiltro = document.querySelectorAll(".filtro");

botoesFiltro.forEach(function(botao) {

    botao.addEventListener("click", function() {

        filtroAtual = botao.getAttribute("data-filtro");

        botoesFiltro.forEach(function(item) {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        mostrarTarefas();

    });

});


// LIMPAR TODAS
botaoLimpar.addEventListener("click", function() {

    if (tarefas.length === 0) {
        return;
    }

    let confirmar = confirm("Deseja realmente excluir todas as tarefas?");

    if (confirmar) {

        tarefas = [];

        salvarTarefas();
        mostrarTarefas();

    }

});


// BOTÃO ADICIONAR
botaoAdicionar.addEventListener("click", adicionarTarefa);


// ADICIONAR COM ENTER
campoTarefa.addEventListener("keydown", function(evento) {

    if (evento.key === "Enter") {
        adicionarTarefa();
    }

});


// SALVAR NO NAVEGADOR
function salvarTarefas() {

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

}


// CARREGAR TAREFAS SALVAS
function carregarTarefas() {

    let tarefasSalvas = localStorage.getItem("tarefas");

    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
    }

    mostrarTarefas();

}
carregarTarefas();