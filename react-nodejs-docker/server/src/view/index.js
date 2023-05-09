const crawling = require('../models/crawling')
const connection = require('../models/connection')
const { Charinfo } = require('../models/info')


const updateCharacter = async (req, res) => {
    const user = await connection.getUser(req.body.username)
    if (user.state != 200) {
        res.status(404).json({state: 'user not found'})
        return
    }
    const crawl = await crawling.crawling(req.body.username)
    if (crawl.state != 200) {
        res.status(404).json({state: 'crawling failed'})
        return
    }
    const update = await connection.updateUser(crawl.charInfo)
    if (update.state != 200) {
        res.status(404).json({state: 'update failed'})
        return
    }
    res.json({ state:'succsess' })
}

const updateItem = async(req, res) => {
    await crawling.crawlingItem(req.body.username)
    res.json({ state:'succsess' })
}

const isUser = async (req, res) => {
    let charInfo = {...Charinfo}
    const user = await connection.getUser(req.body.username)
    if (user.state != 200) {
        let isuser = await crawling.isUser(req.body.username)
        if (isuser.state != 200) {
            res.status(404).json({state: 'user not found'})
            return
        }
        charInfo = isuser.charInfo
        charInfo.date = getToday()
        const insert = await connection.insertUser(charInfo)
        if (insert.state != 200) {
            res.status(404).json({state: 'Database err'})
            return
        }
    }
    else {
        charInfo = user.charInfo
    }
    res.json({ state:'succsess', values: {charInfo}})
}

function getToday(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

module.exports = { updateCharacter, isUser, updateItem }