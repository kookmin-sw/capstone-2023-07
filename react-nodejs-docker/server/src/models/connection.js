const { query } = require('express');
const mysql = require('mysql2/promise');
const { Charinfo } = require('../models/info')

const pool = mysql.createPool({
    host: 'dev.pinkbean.kr',
    port: '8005',
    user: 'capston',
    password: 'capston',
    database: 'capston'
});

const getConn = async() => {
    return await pool.getConnection(async (conn) => conn);
};

let test = async(req, res)=>{
    const conn = await getConn();
    let [rows, fileds] = await conn.query("SELECT * FROM test;",[])
    conn.release()
    res.json({ values:rows })
}

let getItems = async(username) => {
    const conn = await getConn();
    let state = 200
    let items = []
    let sum_opt = []
    var total = 0;
    try {
        var sql = `select idx from items where name = ? order by idx desc limit 1;`
        var [rows] = await conn.query(sql, [username])
        var items_idx = rows[0].idx
        var sql = 'select * from item where items_idx = ?;'
        var [rows] = await conn.query(sql, [items_idx])

        items = rows

        var sql = `SELECT o.name, sum(o.option) as sum FROM 
        capston.item i 
        join item_option o on i.idx = o.item_idx
        where items_idx = ? group by o.name order by sum desc;`
        var [rows] = await conn.query(sql, [items_idx])
        sum_opt = rows
        
        var sql = `SELECT job, level FROM capston.user where name = ?;`
        var [rows] = await conn.query(sql, [username])
        var job = rows[0].job.split('\/')[1]
        var level = rows[0].level

        var sql = `SELECT stat, att FROM capston.job where job = ?;`
        var [rows] = await conn.query(sql, [job])
        var stat = rows[0]
        validOption = stat.stat.split(',')
        for(var i in sum_opt) {
            if(sum_opt[i].name == validOption[0]) {
                total += Number(sum_opt[i].sum)
            }
            if(sum_opt[i].name == validOption[1]) {
                total += Number(sum_opt[i].sum) * 0.1
            }
            if(validOption.length > 2 && sum_opt[i].name == validOption[2]) {
                total += Number(sum_opt[i].sum) * 0.1
            }
            if(sum_opt[i].name == validOption[0] +'%') {
                total += Number(sum_opt[i].sum) * 10
            }
            if(sum_opt[i].name == stat.att) {
                total += Number(sum_opt[i].sum) * 4
            }
            if(sum_opt[i].name  == stat.att + '%') {
                total += Number(sum_opt[i].sum) * 45
            }
            if(sum_opt[i].name.includes('보스몬스터')) {
                total += Number(sum_opt[i].sum) * 15
            }
            if(sum_opt[i].name == '크리티컬데미지%') {
                total += Number(sum_opt[i].sum) * 40
            }
            if(sum_opt[i].name == '데미지%') {
                total += Number(sum_opt[i].sum) * 15
            }
            if(sum_opt[i].name.includes('올스탯')) {
                total += Number(sum_opt[i].sum) * 11
            }
            if(sum_opt[i].name.includes('방어력')) {
                total += Number(sum_opt[i].sum) * 12
            }
            if(sum_opt[i].name.includes('캐릭터기준') && sum_opt[i].name.includes(validOption[0])) {
                total += Number(sum_opt[i].sum) * Math.floor(level / 9)
            }
        }
        total = Math.round(total)
        total = ('' + total).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    catch (err) {
        console.log(err)
        state = 404
    }
    
    conn.release()
    return { state, items, total }
}

let getItem = async(item_idx, job) => {
    const conn = await getConn();
    let state = 200
    let item = []
    let res = []
    let total = 0
    try {
        var sql = `select * from item_option where item_idx = ?;`
        var [rows] = await conn.query(sql, [item_idx])

        item = rows

        var job_ = job.split('\/')[1]

        var sql = `SELECT stat, att FROM capston.job where job = ?;`
        var [rows] = await conn.query(sql, [job_])
        var stat = rows[0]
        validOption = stat.stat.split(',')
        
        for(var i in item) {
            if(item[i].name == validOption[0]) {
                total += Number(item[i].option)
                res.push(item[i])
            }
            if(item[i].name == validOption[1]) {
                total += Number(item[i].option) * 0.25
                res.push(item[i])
            }
            if(validOption.length > 2 && item[i].name == validOption[2]) {
                total += Number(item[i].option) * 0.1
                res.push(item[i])
            }
            if(item[i].name == validOption[0]+'%') {
                total += Number(item[i].option) * 10
                res.push(item[i])
            }
            if(item[i].name == stat.att) {
                total += Number(item[i].option) * 4
                res.push(item[i])
            }
            if(item[i].name == stat.att +'%') {
                total += Number(item[i].option) * 45
                res.push(item[i])
            }
            if(item[i].name.includes('보스몬스터')) {
                total += Number(item[i].option) * 15
                res.push(item[i])
            }
            if(item[i].name == '데미지%') {
                total += Number(item[i].option) * 15
                res.push(item[i])
            }
            if(item[i].name == '크리티컬데미지%') {
                total += Number(item[i].option) * 40
                res.push(item[i])
            }
            if(item[i].name.includes('올스탯')) {
                total += Number(item[i].option) * 11
                res.push(item[i])
            }
            if(item[i].name.includes('몬스터방어')) {
                total += Number(item[i].option) * 12
                res.push(item[i])
            }
            if(item[i].name.includes('캐릭터기준') && item[i].name.includes(validOption[0])) { 
                total += Number(item[i].option) * Math.floor(300 / 9)
                res.push(item[i])
            }
        }
        total = Math.round(total)
        total = ('' + total).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    catch (err) {
        console.log(err)
        state = 404
    }
    
    conn.release()
    return { state, item:res, total }
}

let updateItem = async(username, items)=>{
    const conn = await getConn();
    let state = 200
    
    try {
        var sql = `INSERT INTO capston.items (name) VALUES (?);`
        var [rows] = await conn.query(sql, [username])

        var sql = `SELECT * FROM capston.items where name = ? order by idx desc limit 1;`
        var [rows] = await conn.query(sql, [username])
        var idx = rows[0].idx

        for (var i = 0; i < items.length; i++) {
            var sql = `INSERT INTO capston.item (items_idx, title, starForce, part, img) VALUES (?, ?, ?, ?, ?);`
            var params = [idx, items[i].title, items[i].starForce, items[i].part, items[i].img]
            var [rows] = await conn.query(sql, params)

            var sql = `SELECT * FROM capston.item where items_idx = ? and title = ? order by idx desc;`
            var params = [idx, items[i].title]
            var [rows] = await conn.query(sql, params)

            var item_idx = rows[0].idx
            for (var key in items[i].option) {
                var sql = `INSERT INTO capston.item_option (item_idx, type, name, option) VALUES (?, ?, ?, ?);`
                var params = [item_idx, 'option', key, items[i].option[key]]
                var [rows] = await conn.query(sql, params)
            }
            for (var key in items[i].potential) {
                var sql = `INSERT INTO capston.item_option (item_idx, type, name, option) VALUES (?, ?, ?, ?);`
                var params = [item_idx, 'potential', key, items[i].potential[key]]
                var [rows] = await conn.query(sql, params)
            }
            for (var key in items[i].additional) {
                var sql = `INSERT INTO capston.item_option (item_idx, type, name, option) VALUES (?, ?, ?, ?);`
                var params = [item_idx, 'additional', key, items[i].additional[key]]
                var [rows] = await conn.query(sql, params)
            }
            for (var key in items[i].soul) {
                var sql = `INSERT INTO capston.item_option (item_idx, type, name, option) VALUES (?, ?, ?, ?);`
                var params = [item_idx, 'soul', key, items[i].soul[key]]
                var [rows] = await conn.query(sql, params)
            }
        }

    } catch (err) {
        console.log(err)
        state = 404
    }

    conn.release()
    return { state }
}

let getUser = async(username) => {
    const conn = await getConn();
    let charInfo = {...Charinfo}
    let state = 200
    let sql = ``
    let params = [username]
    try {
        sql = "SELECT * , datediff(now(), date) as diff_date FROM user WHERE name = ?;"
        
        var [rows] = await conn.query(sql, params)
        if (rows.length != 1) state = 404
        charInfo.name = rows[0].name
        charInfo.level = rows[0].level.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        charInfo.job = rows[0].job
        charInfo.server = rows[0].server
        charInfo.guild = rows[0].guild
        charInfo.image = rows[0].img
        charInfo.date = rows[0].diff_date
        
        sql = "select * from capston.rank where name = ? order by idx desc limit 1;"
        var [rows] = await conn.query(sql, params)
        if (rows.length == 1)
        {
            charInfo.rank.rank_all = rows[0].rank.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            charInfo.rank.rank_word = rows[0].word_rank.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            charInfo.rank.rank_job_all = rows[0].job_rank.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            charInfo.rank.rank_job_word = rows[0].job_word_rank.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        else {
            charInfo.rank.rank_all = '-';
            charInfo.rank.rank_word = '-';
            charInfo.rank.rank_job_all = '-';
            charInfo.rank.rank_job_word = '-';
        }

        sql = "select * from capston.seed where name = ? order by floor desc, time asc limit 1;"
        var [rows] = await conn.query(sql, params)
        if (rows.length == 1) 
        {
            charInfo.seed.floor = rows[0].floor.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            charInfo.seed.time = rows[0].time
            charInfo.seed.rank = rows[0].rank.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            charInfo.seed.rank_word = rows[0].word_rank.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            charInfo.seed.date = rows[0].date
        }
        else {
            charInfo.seed.floor = '-'
            charInfo.seed.time = '- 분 - 초'
            charInfo.seed.rank = '-'
            charInfo.seed.rank_word = '-'
            charInfo.seed.date = '-'
        }

        
        sql = "select * from capston.dojang where name = ? order by floor desc, time asc limit 1;"
        var [rows] = await conn.query(sql, params)
        if (rows.length == 1) 
        {
            charInfo.dojang.floor = rows[0].floor.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            charInfo.dojang.time = rows[0].time
            charInfo.dojang.rank = rows[0].rank.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            charInfo.dojang.rank_word = rows[0].word_rank.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            charInfo.dojang.date = rows[0].date
        }
        else {
            charInfo.dojang.floor = '-'
            charInfo.dojang.time = '- 분 - 초'
            charInfo.dojang.rank = '-'
            charInfo.dojang.rank_word = '-'
            charInfo.dojang.date = '-'
        }
        
        sql = "select * from capston.achievements where name = ? order by idx desc limit 1;"
        var [rows] = await conn.query(sql, params)
        if (rows.length == 1) 
        {
            charInfo.achievements.grade = rows[0].grade
            charInfo.achievements.points = rows[0].points.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            charInfo.achievements.rank = rows[0].rank.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            charInfo.achievements.image = rows[0].img
            charInfo.achievements.date = rows[0].date
        }
        else {
            charInfo.achievements.grade = '-'
            charInfo.achievements.points = '-'
            charInfo.achievements.rank = '-'
            charInfo.achievements.image = '-'
            charInfo.achievements.date = '-'
        }
        
        sql = "select * from capston.union where name = ? order by idx desc limit 1;"
        var [rows] = await conn.query(sql, params)
        if (rows.length == 1) 
        {
            charInfo.union.grade = rows[0].grade
            charInfo.union.level = rows[0].level.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            charInfo.union.rank = rows[0].rank.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            charInfo.union.rank_word = rows[0].word_rank.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            charInfo.union.power = rows[0].power.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            charInfo.union.date = rows[0].date
        }
        else {
            charInfo.union.grade = '-'
            charInfo.union.level = '-'
            charInfo.union.rank = '-'
            charInfo.union.rank_word = '-'
            charInfo.union.power = '-'
            charInfo.union.date = '-'
        }

    }
    catch (err) {
        console.log(err)
        state = 404
    }
    conn.release()
    return { state, charInfo }
}

let insertUser = async(charInfo) => {
    const conn = await getConn();
    let state = 200
    let rows = []
    try {
        let sql = `INSERT INTO capston.user (name, level, job, server, guild, img, date) 
        VALUES (?, ?, ?, ?, ?, ?, null);`
        let params = [charInfo.name, charInfo.level, charInfo.job, charInfo.server, charInfo.guild, charInfo.image];
        [rows] = await conn.query(sql, params)
    }
    catch (err) {
        console.log(err)
        state = 404;
    }
    conn.release()
    return { state }
}

let updateUser = async(charInfo) => {
    const conn = await getConn();
    var state = 200
    let sql = ``
    let params = []
    try {
        sql = `update capston.user SET level = ?, job = ?, server = ?, guild = ?, img = ?, date = now() where name = ?;`
        params = [charInfo.level, charInfo.job, charInfo.server, charInfo.guild, charInfo.image, charInfo.name]
        await conn.query(sql, params)

        sql = `INSERT INTO capston.rank (name, rank, word_rank, job_rank, job_word_rank) 
        VALUES (?, ?, ?, ?, ?);`
        params = [charInfo.name, charInfo.rank.rank_all, 
            charInfo.rank.rank_word, charInfo.rank.rank_job_all, charInfo.rank.rank_job_word]
        await conn.query(sql, params)

        
        sql = `INSERT INTO capston.seed (name, floor, time, rank, word_rank, date) 
        VALUES (?, ?, ?, ?, ?, now());`
        params = [charInfo.name, charInfo.seed.floor, 
            charInfo.seed.time, charInfo.seed.rank, charInfo.seed.rank_word]
        if(charInfo.seed.floor.length > 0) await conn.query(sql, params)

        
        sql = `INSERT INTO capston.dojang (name, floor, time, rank, word_rank, date) 
        VALUES (?, ?, ?, ?, ?, now());`
        params = [charInfo.name, charInfo.dojang.floor, 
            charInfo.dojang.time, charInfo.dojang.rank, charInfo.dojang.rank_word]
        if(charInfo.dojang.floor.length > 0) await conn.query(sql, params)

        
        sql = `INSERT INTO capston.achievements (name, grade, img, points, rank, date) 
        VALUES (?, ?, ?, ?, ?, now());`
        params = [charInfo.name, charInfo.achievements.grade, 
            charInfo.achievements.image, charInfo.achievements.points, charInfo.achievements.rank]
        if(charInfo.achievements.points.length > 0) await conn.query(sql, params)

        
        sql = `INSERT INTO capston.union (name, grade, level, rank, word_rank, power, date) 
        VALUES (?, ?, ?, ?, ?, ?, now());`
        params = [charInfo.name, charInfo.union.grade, 
            charInfo.union.level, charInfo.union.rank, charInfo.union.rank_word, charInfo.union.power]
        if(charInfo.union.power.length > 0) await conn.query(sql, params)
    }
    catch (err) {
        console.log(err)
        state = 404;
    }
    conn.release()
    return { state }

}



module.exports = { test, getUser, insertUser, updateUser, updateItem, getItems, getItem }