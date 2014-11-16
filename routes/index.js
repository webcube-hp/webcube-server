var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Worker = mongoose.model('Worker');
var ObjectId = mongoose.Types.ObjectId;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/start', function(req, res) {
  Worker.find({}, function(err, workers) {
            workers.forEach(function(w) {
                if (w.state) {
                  break;
                }
            })
        });
});

/* GET home page. */
router.get('/stop', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
