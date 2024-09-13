document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const startDate = new Date('2024-09-15'); // Data inicial
    const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const weeksPassed = Math.floor((today - startDate) / weekInMilliseconds);

    // Calcular a imagem a ser exibida
    const imageNumber = (weeksPassed % 3) + 1;
    document.getElementById('config-image').src = `${imageNumber}.png`;

    // Preencher a tabela de tarefas
    fetch('dados.json')
        .then(response => response.json())
        .then(tasks => {
            const tasksTable = document.getElementById('tasks-table');
            tasks.forEach(task => {
                const row = document.createElement('tr');
                const formattedDate = new Date(task.date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'numeric' });
                const status = `
                    Aldir: ${task.Aldir}, 
                    João: ${task.João}, 
                    Jhonnata: ${task.Jhonnata}
                `;
                row.innerHTML = `<td>Semana do dia ${formattedDate}</td><td>${status}</td>`;
                tasksTable.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao carregar dados:', error));

    // Atualizar a legenda com as cores
    const legend = document.getElementById('legend');
    legend.innerHTML = `
        <div class="legend-item">
            <div class="color-box" style="background-color: #597445;"></div>
            <span>Aldir</span>
        </div>
        <div class="legend-item">
            <div class="color-box" style="background-color: #102C57;"></div>
            <span>João</span>
        </div>
        <div class="legend-item">
            <div class="color-box" style="background-color: #803D3B;"></div>
            <span>Jhonnata</span>
        </div>
    `;
});
