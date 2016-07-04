'use strict';

var Board = require('../model/board');

function BoardController(){
  
}

BoardController.prototype.getBoards = function (req, res){

  Board.find({},function (err,data){
    if(!err){
      res.send({boards: data, status: 200});
    }else {
      res.send({err: err, status: 404});
    }
  })
};

BoardController.prototype.getBoardInfo = function (req, res){
  var id = req.params.boardId;
  Board.findOne({id: id}, function (err, data){
    if(!err){
      res.send({board: data, status: 200});
    }else {
      res.send ({err: err, status: 404});
    }
  });
  
};

BoardController.prototype.saveInfo = function (req, res){
  var data = req.body.data;
  var board = new Board();
  board.name = data.name;
  board.desc = data.desc;
  board.createOn = data.createOn;
  board.owner = data.owner;
  
  Board.find({}).then(function (doc){
    board.id = doc.length + 1;
    board.save(function (err, data){
      if(!err){
        res.send({status: 201, err: null})
      }else {
        res.send({status: 500, err: err})
      }
    })
  });

};

BoardController.prototype.updateInfo = function (req, res){
  var data = req.body.data;
  Board.findOne({id: data.id}).then(function (doc){
    doc.name = data.name;
    doc.desc = data.desc;
    doc.owner = data.owner;
    doc.save(function (err, data){
      if(!err){
        res.send({status: 202, err: null})
      }else {
        res.send({status: 500, err: err})
      }
    })
  })
};

BoardController.prototype.deleteBoard = function (req, res){
  var id = req.query.boardId;
  Board.remove({id: id},function (err, data){
    console.log(id);
    if(!err){
      res.send({status: 200});
    }
  })

};

module.exports = BoardController;