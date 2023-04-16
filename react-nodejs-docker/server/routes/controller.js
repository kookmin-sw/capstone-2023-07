const { ranking } = require('../src/models/crawling')

let main = function (req, res) {
    res.end("200 OK")
}

module.exports = { main, ranking };