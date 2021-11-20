const { ethers } = require('ethers');
const express = require('express');
const fortAbi = require('./abis/Fort.json')

const provider = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc');
const fort = new ethers.Contract('0xf6d46849db378ae01d93732585bec2c4480d1fd5', fortAbi, provider);

const app = express()

app.get('/', (req, res) => {
  fort.totalSupply().then((totalSupply) => {
    totalSupply = parseInt(totalSupply.toString()) / 10 ** 9;
    res.send(totalSupply + '')
  })
})

app.listen(80)
