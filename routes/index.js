var express = require('express');
var router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const API = require('./crud')

router.use(bodyParser.raw({ type: 'application/pdf' }));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

router.get('/', (req, res) => {
    try{
      //var sessionId = mysession(req.cookies['connect.sid']);
      var session = req.cookies['localId'];
      res.render('index.ejs', { user: {}, page: '' });
  
      console.log('---------------->> ',session);
    }catch(err){
      //console.log(err);
      res.render('index.ejs', { user: {}, page: '' });
    }
    
  });

router.post('/api/search/sekolah', (req, res)=>{
    API.search.sekolah(req.body.searchstr, data=>{
        res.send(data);
    })
});

router.post('/api/search/peserta', (req, res)=>{
    API.search.peserta(req.body.searchstr, data=>{
        res.send(data);
    })
});


router.post('/api/search/kumpulan', (req, res)=>{
    API.search.kumpulan(req.body.searchstr, data=>{
        res.send(data);
    })
});

  module.exports = router;