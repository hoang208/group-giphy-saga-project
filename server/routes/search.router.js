const express = require('express');
const pool = require('../modules/pool');
const { default: axios } = require('axios');
const API_KEY = process.env.API_KEY
// let searchQuery;


const router = express.Router();

router.get('/:search', (req, res) => {
    let searchQuery=req.params['search']
    console.log("in Get Server")
    axios({
        method: "GET",
        url: `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchQuery}&limit=5`
        
    })
        .then((response) => {
            console.log("get to giphy search success!", response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.log("get to giphy search error!:", err)
        })
})


module.exports = router;
