class CardHardware {
    constructor(idValor, idBarra, idBloco) {
        this.elValor = document.getElementById(idValor);
        this.elBarra = document.getElementById(idBarra);
        this.elBloco = document.getElementById(idBloco);
    }

    atualizar(valor, tipo) {
        if (!this.elValor || !this.elBarra) return;

        // Define se usa % ou °C
        const sufixo = (tipo === 'TEMP') ? '°C' : '%';
        this.elValor.innerText = `${valor}${sufixo}`;
        this.elBarra.style.width = `${valor}%`;

        // Alerta Crítico
        if (parseFloat(valor) > 80) {
            this.elBloco?.classList.add('alertacritico');
            if (tipo === 'TEMP') this.elBloco.style.animation = "shaking 0.2s infinite";
        } else {
            this.elBloco?.classList.remove('alertacritico');
            this.elBloco.style.animation = "";
        }
    }
}

const monitorCPU  = new CardHardware('cpu-valor', 'cpu-barra', 'bloco-cpu');
const monitorRAM  = new CardHardware('ram-valor', 'ram-barra', 'bloco-ram');
const monitorTemp = new CardHardware('temp-valor', 'temp-barra', 'bloco-temp');

async function buscarDados() {
    try {
        const resposta = await fetch('http://localhost:3000/api/sensor');
        const dados = await resposta.json();

        monitorCPU.atualizar(dados.cpu, 'CPU');
        monitorRAM.atualizar(dados.ram, 'RAM');
        monitorTemp.atualizar(dados.temperatura, 'TEMP');

        console.log("Dados recebidos:", dados);
    } catch (erro) {
        console.error("Erro: O servidor Node.js está desligado!", erro);
    }
}

setInterval(buscarDados, 2000);
buscarDados();