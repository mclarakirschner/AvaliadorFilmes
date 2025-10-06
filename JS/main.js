import {
    adicionarFilme,
    ordenarNota,
    exibirMelhores,
    exibirTodos,
    filtrarPorGenero,
    removerUltimo,
    limparAvaliacao
} from "./script.js";

// Conectar botões aos eventos
document.querySelector(".enviar").addEventListener("click", adicionarFilme);
document.querySelector(".limpar").addEventListener("click", limparAvaliacao);
document.querySelector(".ordenavel").addEventListener("click", ordenarNota);
document.querySelector("#exibirmelhores").addEventListener("click", exibirMelhores);
document.querySelector("#exibirTodos").addEventListener("click", exibirTodos);
document.querySelector("#filtrarGenero").addEventListener("change", filtrarPorGenero);
document.querySelector("#removerUltimo").addEventListener("click", removerUltimo);

