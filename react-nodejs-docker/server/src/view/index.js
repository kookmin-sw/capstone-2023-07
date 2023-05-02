const { crawling } = require('../models/crawling')
const { test } = require('../models/connection')


const updateCharacter = async (req, res) => {
    const crawl = await crawling(req.body.username)
    if (crawl.state != 200) {
        res.state(404).json({state: 'crawling failed'})
        return
    }
    console.log(crawl)
    res.end('200')
}

module.exports = { updateCharacter }