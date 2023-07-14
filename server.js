const express = require('express')
const cors = require('cors')
const path = require('path')
const routes = require('./routes/router')
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use('/api', routes)

/*
app.use(express.static('public'))
*/


app.get('*', async (req, res) => {
    res.status(400).send("Route not available")
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

