'use strict';

var express = require('express');
var router = express.Router();
var BoardController = require('../../controller/board-controller');
var boardController = new BoardController ();

router.get('/', boardController.getBoards);
router.get('/:boardId', boardController.getBoardInfo);
router.post('/', boardController.saveInfo);
router.put('/', boardController.updateInfo);
router.delete('/', boardController.deleteBoard);

module.exports = router;