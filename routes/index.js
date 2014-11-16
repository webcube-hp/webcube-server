var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Worker = mongoose.model('Worker');
var Game = mongoose.model('Game');
var ObjectId = mongoose.Types.ObjectId;
var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res) {
  var w = new Worker({
    ip: '192.168.1.3',
    isPlaying: false
  })
  w.save(function(err, worker) {
    if (err) {
      console.log("Error: saving worker", worker);
      res.send(500)
    }
    res.json(worker);
  })
});

router.get('/create', function(req, res) {
  Worker.findOne({isPlaying: false}, function(err, worker) {
    if (err) {
      console.log("Error: finding free worker: ", err);
      res.send(500);
    }
    if (worker == null) {
      console.log("Error: : no free workers");
      return res.send(500);
    }
    console.log(worker);
    request('http://www.google.com', function(err, response, body) {
      if (err) {
        console.log("Error: creating game session", err);
        res.send(500);
      }
      worker.isPlaying = true;
      worker.save(function(err, w) {
        if (err) {
          console.log('Error: changing worker state: ', err);
          res.send(500);
        }
        var game = new Game({
          worker: w._id,
          code: Math.floor(Math.random()*90000) + 10000
        })
        game.save(function(err, g) {
          if (err) {
            console.log("Error: creating game object", err);
            res.send(500);
          }
          var code = g.code;
          res.redirect('/start?code=' + code);
          // res.json({ip: worker.ip});
        })
      })
    })
    
  });
});

router.get('/join', function(req, res) {
  res.render('join', { title: 'Express' });
});

router.post('/join', function(req, res) {
  var code = req.body.code;
  res.redirect('/start?code=' + code);
});

router.get('/start', function(req, res) {
  var code = req.query.code;
  code = (code) ? code : 00000;
  res.render('start', { title: 'Express', code: code });
});

module.exports = router;
