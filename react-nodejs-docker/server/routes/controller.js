const { ranking } = require('../src/models/crawling')
const { test } = require('../src/models/connection')

let main = function (req, res) {
    res.end("200 OK")
}


module.exports = { main, ranking, test };