let db = require('../database/models');

let indexController = {
    'form': function(req,res){
        res.render('new-operation-form',{user: req.session.userLog})
    },
    'addOp': function(req,res){
        if(req.session.userLog != undefined){
        db.Operation.create({
            amount: req.body.amount,
            type: req.body.type,
            description: req.body.description,
            date: req.body.date,
            user_id: req.session.userLog.id
        }).then(function(op){
            res.redirect('/')
        })
        .catch(function(err){
            console.log(err);
        })
    } else {
        db.Operation.create({
            amount: req.body.amount,
            type: req.body.type,
            description: req.body.description,
            date: req.body.date,
        }).then(function(op){
            res.redirect('/')
        })
        .catch(function(err){
            console.log(err);
        })
    }
}
}

module.exports = indexController;