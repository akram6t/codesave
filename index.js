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
    origin: 'https://codesave.vercel.app',
    methods: ["POST", "GET"]
  }
));
app.use(express.json());

server.listen(port, () => {
    console.log('server listen on port: ' + port);
});

app.get("/users", (req, res) => {
  res.send({message: "user triggered"});

});

app.get("/apis/users", (req, res) => {
  res.send({message: "user apis"});
});

app.use(express.static(path.join(__dirname, './public')));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.use(express.static("./public"));
if (process.env.NODE_ENV == "production") {
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname + './public', 'index.html'));
})
}

app.use('/api', router);
