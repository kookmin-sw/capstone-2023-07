const view = require('../src/view')
const { test } = require('../src/models/connection')

let main = function (req, res) {
    res.end("200 OK")
}

const update = view.updateCharacter
const updateItem = view.updateItem
const isUser = view.isUser
const getItems = view.getItems
const getItem = view.getItem


module.exports = { main, test, update, isUser, updateItem, getItems, getItem };