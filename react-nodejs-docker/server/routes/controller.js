const crawlling = require('../src/models/crawlling')

let main = function (req, res) {
    crawlling('리바기')
    res.end("200 OK")
}
let test = function (req, res) {
    res.end("200")
}

module.exports = { main, test };