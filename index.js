const express = require('express')
const axios = require('axios')

const app = express()

app.get('/', (req, res) => {
  axios.post('https://api.thegraph.com/subgraphs/name/morazzela/fortressalpha', {
    query: `
      query {
        protocolMetrics
        (
          first: 1,
          orderBy: timestamp,
          orderDirection: desc
        )
        {
          totalSupply
          ohmCirculatingSupply
        }
      }
    `
  }).then((result) => {
    if (req.query.q == "circ") {
      return res.send(Number.parseFloat(result.data.data.protocolMetrics[0].ohmCirculatingSupply))
    }

    if (req.query.q == "total") {
      return res.send(Number.parseFloat(result.data.data.protocolMetrics[0].totalSupply))
    }

    res.json({
      totalSupply: Number.parseFloat(result.data.data.protocolMetrics[0].totalSupply),
      circSupply: Number.parseFloat(result.data.data.protocolMetrics[0].ohmCirculatingSupply),
    })
  })
})

app.listen(80)
