document.addEventListener('DOMContentLoaded', function () {
    // Função para buscar os dados do backend
    fetch('dados.json')  // Carregando os dados do arquivo JSON local
        .then(response => response.json())
        .then(data => {
            atualizarMapa(data.semanaAtual);
            atualizarTabela(data.semanas.slice(-4));
        });

    // Atualiza o mapa de acordo com a semana
    function atualizarMapa(semanaAtual) {
        const mapa = document.getElementById('mapa');
        mapa.src = `${semanaAtual}.png`;  // Exibe a imagem correta para a semana atual
    }

    // Atualiza a tabela das últimas 4 semanas
    function atualizarTabela(ultimasSemanas) {
        const tabela = document.getElementById('tabela-semanas');
        tabela.innerHTML = ''; // Limpa a tabela antes de inserir novos dados

        ultimasSemanas.forEach(semana => {
            const tr = document.createElement('tr');
            
            const tdSemana = document.createElement('td');
            tdSemana.textContent = `Semana ${semana.semana}`;
            tr.appendChild(tdSemana);

            const tdAldir = document.createElement('td');
            tdAldir.textContent = semana.tarefasConcluidas.aldir ? 'Feito' : 'Pendente';
            tr.appendChild(tdAldir);

            const tdJoao = document.createElement('td');
            tdJoao.textContent = semana.tarefasConcluidas.joao ? 'Feito' : 'Pendente';
            tr.appendChild(tdJoao);

            const tdJhonnata = document.createElement('td');
            tdJhonnata.textContent = semana.tarefasConcluidas.jhonnata ? 'Feito' : 'Pendente';
            tr.appendChild(tdJhonnata);

            tabela.appendChild(tr);
        });
    }
});