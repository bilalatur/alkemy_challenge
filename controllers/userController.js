let db = require('../database/models');
const bcrypt=require('bcrypt');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price) => toThousand(Math.round(price));

let userController = {
    'register': function(req,res){
        res.render('register')
    },
    'postRegister':function(req,res){
        db.User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        }).then(function(user){
            res.redirect('/user/login')
        })
    },
    'login': function(req,res){
        res.render('login')
    },
    'postLogin':function(req,res){
        db.User.findOne({
            where:{
                email: req.body.email
            }
        }).then(function(user){
            if(user != null){
                console.log(user)
                if(bcrypt.compareSync(req.body.password, user.password)){
                    req.session.userLog = user;
                        if(req.body.remember != undefined){
                            let expires = new Date(Date.now() + 900000);
                            res.cookie('bazinga', user.email, {expires: expires});
                        }
                        db.Operation.findAll()
                        .then(function(operation){
                            console.log(user)
                            res.redirect('/')
                        })
                } else {
                    res.render('error')
                }
            }
        })
    },
    'logout': function(req,res){
        req.session.destroy(function(){
           if (req.cookies.remember != undefined) {
              res.clearCookie("remember");
           };
           res.redirect('/');
        });
     },
}

module.exports = userController;