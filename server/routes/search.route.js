const express = require('express');
const pool = require('../modules/pool');
const API_KEY = process.env.API_KEY
const searchQuery=
const router = express.Router();

app.get('/gifs/random', (req, res) => {
    axios({
        method: "GET",
        url: `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}`
    })
        .then((response) => {
            console.log("get to giphy random success!", response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.log("get to giphy random error!:", err)
        })
})


module.exports = router;