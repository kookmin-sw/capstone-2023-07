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
    res.json({ values:rows })
}

let getUser = async(username) => {
    const conn = await getConn();
    let charInfo = {...Charinfo}
    let state = 200
    try {
        var [rows] = await conn.query("SELECT * FROM user WHERE name = ?;", [username])
        console.log(rows)
        if (rows.length != 1) state = 404
        
        charInfo.name = rows[0].name
        charInfo.level = rows[0].level
        charInfo.job = rows[0].job
        charInfo.server = rows[0].server
        charInfo.guild = rows[0].guild
        charInfo.image = rows[0].img
        charInfo.date = rows[0].date
    }
    catch (err) {
        console.log(err)
        state = 404
    }
    return { state, charInfo }
}

let insertUser = async(charInfo) => {
    const conn = await getConn();
    let state = 200
    let rows = []
    try {
        let sql = `INSERT INTO capston.user (name, level, job, server, guild, img, date) 
        VALUES (?, ?, ?, ?, ?, ?, now());`
        let params = [charInfo.name, charInfo.level, charInfo.job, charInfo.server, charInfo.guild, charInfo.image];
        [rows] = await conn.query(sql, params)
    }
    catch (err) {
        console.log(err)
        state = 404;
    }
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

    return { state }

}

module.exports = { test, getUser, insertUser, updateUser }