const express = require('express');
//const bcryptjs = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const cors = require('cors');

const port=process.env.PORT || 8000;

require('./db/connection');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello g");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});