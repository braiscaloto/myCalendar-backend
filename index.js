'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./db/config');

const app = express();

dbConnection();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
