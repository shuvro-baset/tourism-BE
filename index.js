const express = require('express');
const app = express();
const port = app.config.PORT || 5000;




app.get('/', (req, res) => {
    res.send('Welcome to the travency....')
})

app.listen(port, (req, res) => {
    res.send("server running at port ", port)
});