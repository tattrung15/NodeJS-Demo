let acc = [
    {
        id: 98347829347,
        email: "fghjg@gmail.com",
        name: "Akuygkuvy",
        password: "123456"
    }
];

module.exports.requireAuth = function(req, res, next) {
    if(!req.signedCookies.userID){
        res.redirect('/auth/login');
        return;
    }

    let user = acc.find(item => item.id == req.signedCookies.userID);

    if(!user){
        res.redirect('/auth/login');
        return;
    }

    res.locals.user = user;

    next();
}