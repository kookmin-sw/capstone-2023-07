
const post = (path, body) => {
    return fetch('http://dev.pinkbean.kr:8001' + path,{ 
        method: 'POST', 
        headers : {
            "Content-Type":"application/json; charset=utf-8"
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json());
}
const get = (path, params) => {
    return fetch('http://dev.pinkbean.kr:8001' + path + '?' + new URLSearchParams(params),{ 
        method: 'GET'
    })
    .then(response => response.json());
}

const isUser = async (username) => {
    return post('/isUser', { username })
}
const update = async (username) => {
    return post('/update', { username })
}
const updateItem = async (username) => {
    return post('/updateItem', { username })
}
const getItems = async (username) => {
    return get('/getItems', { username })
}
const getItem = async (item_idx, job) => {
    return get('/getItem', { item_idx, job })
}

module.exports = { isUser, update, getItems, getItem, updateItem }