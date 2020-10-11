let db = require('../database/models');
let sequelize = db.sequelize;
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price) => toThousand(Math.round(price));

let indexController = {
    'home': function(req,res){
        if(req.session.userLog != undefined){
        db.Operation.findAll({
            where:{
                type: "Income",
                user_id: req.session.userLog.id
            },
            attributes:[[sequelize.fn('sum',sequelize.col('amount')),'totalInc']],
            raw: true
        })
        .then(function(totalInc){
            db.Operation.findAll({
                where:{
                    type: "Outcome",     
                    user_id: req.session.userLog.id
                },
                attributes:[[sequelize.fn('sum',sequelize.col('amount')),'totalOut']],
                raw: true
            })
            .then(function(totalOut){
                db.Operation.findAll({
                    where:{                       
                        user_id: req.session.userLog.id
                    },
                    order:[
                        ['date','DESC']
                    ],
                    limit: 10
                })
                .then(function(operations){
                    let balance = totalInc[0].totalInc - totalOut[0].totalOut
                    res.render('index',{balance,operations,toThousand,formatPrice,user: req.session.userLog})
                })
            })
        })
    } else {
        db.Operation.findAll({
            where:{
                type: "Income",
            },
            attributes:[[sequelize.fn('sum',sequelize.col('amount')),'totalInc']],
            raw: true
        })
        .then(function(totalInc){
            db.Operation.findAll({
                where:{
                    type: "Outcome",     
                },
                attributes:[[sequelize.fn('sum',sequelize.col('amount')),'totalOut']],
                raw: true
            })
            .then(function(totalOut){
                db.Operation.findAll({
                    order:[
                        ['date','DESC']
                    ],
                    limit: 10
                })
                .then(function(operations){
                    let balance = totalInc[0].totalInc - totalOut[0].totalOut
                    res.render('index',{balance,operations,toThousand,formatPrice,user: req.session.userLog})
                })
            })
        })
    } 
    },
    'deletePage': function(req,res){
        db.Operation.findOne({
            where:{
                id: req.params.id
            }
        })
        .then(function(operation){
            res.render('delete', {operation:operation, toThousand, formatPrice})
        })
    },
    'delete': function(req,res){
        db.Operation.destroy({
            where:{
                id: req.params.id
            }
        })
        res.redirect('/')
    },
    'editPage': function(req,res){
        db.Operation.findOne({
            where:{
                id: req.params.id
            }
        })
        .then(function(operation){
            res.render('edit', {operation:operation, toThousand, formatPrice,user: req.session.userLog})
        })
    },
    'edit': function(req,res){
        db.Operation.update({
            amount: req.body.amount,
            description: req.body.description,
            date: req.body.date
        },{
            where:{
                id: req.params.id
            }
        })
        res.redirect('/')
    }
}

module.exports = indexController;