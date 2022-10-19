const express = require('express')

const server = express()

server.get('/hello', (req, res) => {

    const { name } = req.query

    return res.json({
        name: name,
        message: `Hello, ${name}! Welcome to the party!`,
    })
})

server.listen(3000)