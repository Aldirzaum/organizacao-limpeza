const express = require('express');
const fs = require('fs');
const cron = require('node-cron');
const app = express();
const PORT = 3000;

// Serve o diretório atual como estático
app.use(express.static(__dirname));

// Middleware para salvar dados no arquivo JSON
let dados = require('./dados.json');
function salvarDados() {
  fs.writeFileSync('./dados.json', JSON.stringify(dados, null, 2));
}

// Atualização automática a cada domingo
cron.schedule('0 0 * * SUN', () => {
  const { semanaAtual } = dados;
  const novaSemana = (semanaAtual % 3) + 1;
  const novaEntrada = {
    semana: semanaAtual + 1,
    responsabilidades: {
      aldir: novaSemana === 1 ? 'parte 1' : novaSemana === 2 ? 'parte 2' : 'parte 3',
      joao: novaSemana === 1 ? 'parte 2' : novaSemana === 2 ? 'parte 3' : 'parte 1',
      jhonnata: novaSemana === 1 ? 'parte 3' : novaSemana === 2 ? 'parte 1' : 'parte 2',
    },
    tarefasConcluidas: {
      aldir: false,
      joao: false,
      jhonnata: false,
    }
  };
  dados.semanas.push(novaEntrada);
  dados.semanaAtual += 1;
  salvarDados();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});