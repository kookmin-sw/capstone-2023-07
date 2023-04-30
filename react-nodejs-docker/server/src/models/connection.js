const mysql = require('mysql2/promise');

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

var test = async(req, res)=>{
    const conn = await getConn();
    let [rows, fileds] = await conn.query("SELECT * FROM test;",[])
    conn.release();
    res.json({ values:rows })
}


module.exports = { test }