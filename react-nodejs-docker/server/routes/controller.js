const view = require('../src/view')
const { test } = require('../src/models/connection')

let main = function (req, res) {
    res.end("200 OK")
}

const update = view.updateCharacter


module.exports = { main, test, update };