const express = require("express");
const fs = require("node:fs");
const server = express();
const cors = require("cors");
server.use(cors()); 
server.use(express.json());

server.post('/', (req, res) => {
    const { name, msg, date } = req.body;
    if (!name || !msg || !date) {
        return res.status(400).send('Bad Request: Missing required fields');
    }
    saveMessageToFile({ name, msg, date }, (err) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).send('Message saved successfully');
    });
});
server.get('/', (req, res) => {
    res.send("Server is running on http://192.168.175.43:3000 successfully");
    
});

// server.get('/', (req, res) => {
//     fs.readFile('messages.txt', 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).send('Internal Server Error');
//         }
//         res.send(data);
//     });
// });

server.get('/test', (req, res) => {
    
        res.send("Server is running on http://192.168.175.43:3000 successfully");
  
});

function saveMessageToFile(data, callback) { 
    const message = JSON.stringify(data) + "\n";
    fs.appendFile('messages.txt', message, callback);
}

const host = '192.168.175.43';
server.listen(3000, host, () => {
    console.log("Server is running on http://192.168.175.43:3000");
});
