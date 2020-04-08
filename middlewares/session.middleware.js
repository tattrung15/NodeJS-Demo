const shortid = require('shortid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports = function (req, res, next) {
    if(!req.signedCookies.sessionID){
        let sessionID = shortid.generate();
        res.cookie('sessionID', sessionID, {
            signed: true
        });

        db.get('session').push({id: sessionID}).write();
    }

    next();
}