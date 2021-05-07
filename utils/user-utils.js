const tableNameCosntants = require('../tack/table-name-constants').tables;
const connection = require('../connection');

let _doesUserExist = (username) => {
    const query = `Select * from ${tableNameCosntants.USERS} where 'user_id' = '${username}'`;
    connection.query(query, (err, result) => {
        if(err) throw err;
        if(_.isEmpty(result)) return false;
        return true;
    });
}

const userUtils = {
    doesUserExist : _doesUserExist,
}

module.exports = userUtils;