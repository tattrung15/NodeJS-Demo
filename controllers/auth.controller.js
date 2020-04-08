let acc = [
    {
        id: 98347829347,
        email: "buitrungt@gmail.com",
        password: "123456"
    },
    {
        id: 263239479283,
        email: "tattrung15@gmail.com",
        password: "12345"
    }
];

module.exports.login = function (req, res) {
    res.render('auth/login');
}

module.exports.postLogin = function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    let user = acc.find(item => item.email == email);

    if(!user){
        res.render('auth/login', {
            errors: [
                'User does not exist.'
            ],
            values: req.body
        })
        return;
    }

    if(user.password != password){
        res.render('auth/login', {
            errors: [
                'Wrong password'
            ],
            values: req.body
        })
        return;
    }

    res.cookie('userID', user.id, {
        signed: true
    });
    
    res.redirect('/users');
}