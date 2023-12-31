const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const port = process.env.port || 5000;
const path = require('path');
const router = require('./api/routes');

app.use(cors(
  {
    origin: ['*', 'http://localhost:5000', 'https://codesave.vercel.app'],
    methods: ["POST", "GET"]
  }
));
app.use(express.json());

server.listen(port, () => {
    console.log('server listen on port: ' + port);
});

app.get("/is_working", (req, res) => {
  res.send({message: "working fine"});

});

app.use(express.static(__dirname+"/client"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/index.html"));
});

app.use('/api', router);
