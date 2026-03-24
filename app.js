const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3000; 

app.use(cors());

app.use(express.static('public'));

class SensorSimulado {
    lerDado() {
        return {
            cpu: (Math.random() * 90 + 5).toFixed(2),
            ram: (Math.random() * 80 + 10).toFixed(2),
            temperatura: (Math.random() * 40 + 30).toFixed(1),
            timestamp: new Date().toLocaleTimeString()
        };
    }
}

const meuSensor = new SensorSimulado();

app.get('/api/sensor', (req, res) => {
    res.json(meuSensor.lerDado());
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
