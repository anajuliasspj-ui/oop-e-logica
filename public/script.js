
class CardHardware {
    constructor(idValor, idBarra, idBloco) {
        this.elValor = document.getElementById(idValor);
        this.elBarra = document.getElementById(idBarra);
        this.elBloco = document.getElementById(idBloco);
    }

    atualizar(valor) {
        if (this.elValor) {
            this.elValor.innerText = valor;
        }
        if (this.elBarra) {
            this.elBarra.style.width = valor + "%";
            
           
            if (valor > 80) {
                this.elBloco?.classList.add('alertacritico');
            } else {
                this.elBloco?.classList.remove('alertacritico');
            }
        }
    }
}


const monitorCPU  = new CardHardware('cpu-valor', 'cpu-barra', 'bloco-cpu');
const monitorRAM  = new CardHardware('ram-valor', 'ram-barra', 'bloco-ram');
const monitorTemp = new CardHardware('temp-valor', 'temp-barra', 'bloco-temp');


async function buscarDados() {
    try {
        const resposta = await fetch('http://localhost:3000/api/sensor');
        
        if (!resposta.ok) throw new Error("Erro na rede");

        const dados = await resposta.json(); 

        
        monitorCPU.atualizar(dados.cpu);
        monitorRAM.atualizar(dados.ram);
        monitorTemp.atualizar(dados.temperatura);

        console.log("Dados atualizados:", dados);
    } catch (erro) {
        console.error("Não foi possível conectar ao servidor. Verifique se o server.js está rodando!", erro);
    }
}


setInterval(buscarDados, 2000);
buscarDados();
class CardHardware {
    constructor(idValor, idBarra, idBloco) {
        
        this.elValor = document.getElementById(idValor);
        this.elBarra = document.getElementById(idBarra);
        this.elBloco = document.getElementById(idBloco);
    }

    
    atualizarInterface(valor, tipo) {
        if (!this.elValor || !this.elBarra) return;

        
        const sufixo = (tipo === 'TEMP' || tipo === 'temperatura') ? '°C' : '%';

        this.elValor.innerText = `${valor}${sufixo}`;

       
        this.elBarra.style.width = `${valor}%`;

        
        if (valor > 80) {
            this.elBloco?.classList.add('alertacritico');
        } else {
            this.elBloco?.classList.remove('alertacritico');
        }
    }
}