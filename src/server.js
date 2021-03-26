const express = require('express');
const cors = require('cors');
const path = require('path')
const routes = require('./routes');

const server = express();
server.use(cors());
server.use(express.json());
server.use("/files", express.static(path.resolve(__dirname,'..','uploads' )))
server.use(routes);

server.listen(process.env.PORT || 3336);