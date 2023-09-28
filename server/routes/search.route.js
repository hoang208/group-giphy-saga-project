const express = require('express');
const pool = require('../modules/pool');
const { default: axios } = require('axios');
const API_KEY = process.env.API_KEY
// let searchQuery;


const router = express.Router();

router.get('/search', (req, res) => {
    let searchQuery=req.query.search
    axios({
        method: "GET",
        url: `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}q=${searchQuery}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
        
    })
        .then((response) => {
            console.log("get to giphy search success!", response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.log("get to giphy random error!:", err)
        })
})


module.exports = router;
