let filmes = [];

/**
 * Adiciona um novo filme à lista global de filmes.
 *
 * - Valida se os campos obrigatórios foram preenchidos (nome, gênero, nota).
 * 
 * @author Maria Clara Kirschner Baz <mariaclarakirschner@gmail.com>
 * @author Sarah Ribeiro de Souza
 * @author Alice Regina Leite Borges
 * @version 1.0.0
 * @since 1.0.0 (03/10/2025)
 * @returns {void} Atualiza a lista de filmes e a tabela, sem retorno explícito.
 * @throws {Error} Se algum campo obrigatório não for cadastrado.
 * @throws {Error} Se o filme já estiver cadastrado no mesmo gênero.
 *
 * @example
 * adicionarFilme();
 * // Se campos obrigatórios estiverem vazios -> alerta de aviso.
 * // Se o filme já existir no mesmo gênero -> alerta de erro.
 * // Caso contrário -> filme adicionado e tabela atualizada.
 */
export function adicionarFilme() {
    const nome = document.getElementById("nomeFilme").value.trim();
    const genero = document.querySelector('input[name="generoFilme"]:checked')?.value;
    const nota = document.querySelector('input[name="avaliacao"]:checked')?.value;
    const comentario = document.getElementById("comentario").value.trim();

    if (!nome || !genero || !nota) {
        Swal.fire({
            title: 'Campos incompletos',
            text: 'Preencha todos os campos obrigatórios (Nome, Gênero, Nota).',
            icon: 'warning',
            confirmButtonText: 'Fechar'
        });
        return;
    }

    //  --> find
    const existe = filmes.find(f => f.nome.toLowerCase() === nome.toLowerCase() && f.genero === genero);
    if (existe) {
        Swal.fire({
            title: 'Filme duplicado',
            text: `O filme deste gênero já foi avaliado.`,
            icon: 'error',
            confirmButtonText: 'Fechar'
        });
        return;
    }

    //  --> push
    const filme = { nome, genero, nota: parseInt(nota), comentario };
    filmes.push(filme);

    listarFilmes();
    document.getElementById("formularioFilmes").reset();

    Swal.fire({
        title: 'Filme Adicionado!',
        text: `O filme "${nome}" foi adicionado com sucesso.`,
        icon: 'success',
        confirmButtonText: 'Fechar'
    });
}


/**
 * Lista os filmes na tabela HTML.
 * @author Maria Clara Kirschner Baz <mariaclarakirschner@gmail.com>
 * @author Sarah Ribeiro de Souza
 * @author Alice Regina Leite Borges
 * @version 1.0.0
 * @since 1.0.0 (03/10/2025)
 * @param {Array<Object>} [lista=filmes] - Lista de filmes a ser exibida.
 * @returns {void}
 * 
 * @example
 * listarFilmes(); 
 * // Mostra todos os filmes cadastrados
 *
 * listarFilmes([{nome:"John Wick", genero:"Ação", nota:5, comentario:"Ótimo!"}]);
 * // Mostra apenas o filme passado no array
 */

// --> forEach
export function listarFilmes(lista = filmes) {
    const tbody = document.querySelector("#rankingFilmes tbody");
    tbody.innerHTML = "";

    lista.forEach(filme => {
        tbody.innerHTML += `
            <tr>
                <td>${filme.nome}</td>
                <td>${filme.genero}</td>
                <td>${filme.nota}</td>
                <td>${filme.comentario}</td>
            </tr>`;
    });

    calcularMedia(lista);
}


let estadoOrdenacao = 0;

/**
 * Ordena os filmes pela nota.
 *
 * - Estado 0: ordem padrão (sem ordem)
 * - Estado 1: ordem decrescente (maior nota primeiro)
 * - Estado 2: ordem crescente (menor nota primeiro)
 * @author Maria Clara Kirschner Baz <mariaclarakirschner@gmail.com>
 * @author Sarah Ribeiro de Souza
 * @author Alice Regina Leite Borges
 * @version 1.0.0
 * @since 1.0.0 (03/10/2025)
 * @returns {void}
 *
 * @example
 * ordenarNota();
 * // 1ª vez → lista em ordem decrescente
 * // 2ª vez → lista em ordem crescente
 * // 3ª vez → volta ao padrão (sem ordenação)
 */
export function ordenarNota() {
    estadoOrdenacao++;
    if (estadoOrdenacao > 2) estadoOrdenacao = 0;

    let listaOrdenada = [...filmes];

// --> sort
    if (estadoOrdenacao === 1) listaOrdenada.sort((a, b) => b.nota - a.nota);
    else if (estadoOrdenacao === 2) listaOrdenada.sort((a, b) => a.nota - b.nota);

    listarFilmes(listaOrdenada);
}


/**
 * Exibe apenas os filmes com nota maior ou igual a 4.
 * @author Maria Clara Kirschner Baz <mariaclarakirschner@gmail.com>
 * @author Sarah Ribeiro de Souza
 * @author Alice Regina Leite Borges
 * @version 1.0.0
 * @since 1.0.0 (03/10/2025)
 * @returns {void}
 *
 * @example
 * exibirMelhores();
 * // Se houver filmes com nota >= 4 → mostra apenas eles.
 * // Se não houver → exibe alerta informativo.
 *  [Enrolados -- Animação -- 5 -- (comentário)]
 */
// --> filter
export function exibirMelhores() {
    const melhores = filmes.filter(f => f.nota >= 4);
    if (melhores.length === 0) {
        Swal.fire({
            title: 'Nenhum filme encontrado',
            text: 'Não existem filmes com nota 4 ou mais.',
            icon: 'info',
            confirmButtonText: 'Fechar'
        });
        return;
    }
    listarFilmes(melhores);
}


/**
 * Exibe todos os filmes cadastrados.
 * @author Maria Clara Kirschner Baz <mariaclarakirschner@gmail.com>
 * @author Sarah Ribeiro de Souza
 * @author Alice Regina Leite Borges
 * @version 1.0.0
 * @since 1.0.0 (03/10/2025)
 * @returns {void}
 *
 * @example
 * // Restaura a tabela com todos os filmes cadastrados.
 */
export function exibirTodos() {
    listarFilmes();
}


/**
 * Filtra os filmes pelo gênero selecionado.
 * @author Maria Clara Kirschner Baz <mariaclarakirschner@gmail.com>
 * @author Sarah Ribeiro de Souza
 * @author Alice Regina Leite Borges
 * @version 1.0.0
 * @since 1.0.0 (03/10/2025)
 * @returns {void}
 *
 * @example
 * filtrarPorGenero();
 * // Se um gênero for selecionado → mostra apenas filmes desse gênero.
 * // Se nenhum gênero for selecionado → mostra todos.
 */
// --> filter
export function filtrarPorGenero() {
    const generoSelecionado = document.getElementById("filtrarGenero").value;
    if (!generoSelecionado) {
        listarFilmes();
        return;
    }
    listarFilmes(filmes.filter(f => f.genero === generoSelecionado));
}


/**
 * Remove o último filme da lista.
 * @author Maria Clara Kirschner Baz <mariaclarakirschner@gmail.com>
 * @author Sarah Ribeiro de Souza
 * @author Alice Regina Leite Borges
 * @version 1.0.0
 * @since 1.0.0 (03/10/2025)
 * @returns {void}
 *
 * @example
 * removerUltimo();
 * // Se a lista estiver vazia -> alerta avisando que não há filmes.
 * // Caso contrário remove o último filme adicionado e atualiza a tabela.
 */
export function removerUltimo(){
    if(filmes.length === 0){
    Swal.fire({
    title: 'Não existem filmes na lista',
    text: 'Não é prossível remover um filme de uma tabela vazia',
    icon: 'warning', //success, error, info, question
    confirmButtonText: 'Fechar'})
 // --> pop       
    }else{
    filmes.pop();
    listarFilmes();
    Swal.fire({
    title: 'Filme removido!',
    text: 'Último filme removido com sucesso!',
    icon: 'success',
    confirmButtonText: 'Fechar'
    });
    }
}


/**
 * Calcula a média das notas dos filmes.
 * @author Maria Clara Kirschner Baz <mariaclarakirschner@gmail.com>
 * @author Sarah Ribeiro de Souza
 * @author Alice Regina Leite Borges
 * @version 1.0.0
 * @since 1.0.0 (03/10/2025)
 * @param {Array<Object>} [lista=filmes] - Lista de filmes a considerar no cálculo.
 * @returns {void}
 *
 * @example
 * calcularMedia(); 
 * // Calcula e mostra a média de todos os filmes
 *  [Enrolados -- Animação -- nota : 5 -- (comentário)]
 *  [Parasita -- Suspense -- nota : 3 -- (comentário)
 * ------ Média : 4 ---------------------------------
 *
 * calcularMedia([{nome:"X", genero:"Drama", nota:5}]);
 * // Calcula a média apenas da lista fornecida
 */
// --> reduce
export function calcularMedia(lista = filmes) {
    const total = document.getElementById("total");
    if (lista.length === 0) {
        total.textContent = "0,0";
        return;
    }
    const soma = lista.reduce((acc, f) => acc + f.nota, 0);
    total.textContent = (soma / lista.length).toFixed(2);
}


/**
 * Limpa a seleção da nota no formulário.
 * @author Maria Clara Kirschner Baz <mariaclarakirschner@gmail.com>
 * @author Sarah Ribeiro de Souza
 * @author Alice Regina Leite Borges
 * @version 1.0.0
 * @since 1.0.0 (03/10/2025)
 * @returns {void}
 *
 * @example
 * limparAvaliacao();
 * // Desmarca todos os botões de nota no formulário.
 */
// --> forEach
export function limparAvaliacao() {
    document.querySelectorAll('input[name="avaliacao"]').forEach(r => r.checked = false);
}
