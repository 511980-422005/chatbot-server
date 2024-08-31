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
    fs.readFile('messages.txt', 'utf8', (err, data) => {
        if (err) { 
            return res.status(500).send('file la onum ila');
        }

        if (!data.trim()) {
            return res.json([]); //   if the file is empty
        }

        try {
            const messages = data.trim().split('\n').map(line => {
                try {
                    return JSON.parse(line);
                } catch ( err) { 
                    return null;  
                }
            }).filter(msg => msg !== null); // Filter out null values

            res.json(messages);
        } catch (err) { 
            res.status(500).send('Error processing file data');
        }
    });
});

 
server.get('/clear', (req, res) => {
    fs.writeFile('messages.txt', '', (err) => {
        if (err) {
            console.error('Error clearing file:', err);
            return res.status(500).send('Error clearing file');
        }
        console.log('File content cleared');
        res.send('File content cleared');
    });
});

 

function saveMessageToFile(data, callback) { 
    const message = JSON.stringify(data) + "\n";
    fs.appendFile('messages.txt', message, callback);
}
 
server.listen(3000, () => {
    console.log("Server is running on http:/localhost:3000");
});
