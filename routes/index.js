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
      res.render('index.ejs', { user: {}, page: 'search.ejs' });
  
      console.log('---------------->> ',session);
    }catch(err){
      //console.log(err);
      res.render('index.ejs', { user: {}, page: '' });
    }
    
  });

  router.get('/tugasan', (req, res) => {
    try{
      //var sessionId = mysession(req.cookies['connect.sid']);
      var session = req.cookies['localId'];
      res.render('index.ejs', { user: {}, page: 'repo_tugasan.ejs' });
  
      console.log('---------------->> ',session);
    }catch(err){
      //console.log(err);
      res.render('index.ejs', { user: {}, page: '' });
    }
    
  });

  router.get('/__setpertandingan', (req, res) => {
    try{
      //var sessionId = mysession(req.cookies['connect.sid']);
      var session = req.cookies['localId'];
      res.render('index.ejs', { user: {}, page: 'tetapan_pertandingan.ejs' });
  
      console.log('---------------->> ',session);
    }catch(err){
      //console.log(err);
      res.render('index.ejs', { user: {}, page: '' });
    }
    
  });

  router.get('/stats-penyertaan', (req, res) => {
    try{
      //var sessionId = mysession(req.cookies['connect.sid']);
      var session = req.cookies['localId'];
      res.render('index.ejs', { user: {}, page: 'stats_penyertaan.ejs' });
  
      console.log('---------------->> ',session);
    }catch(err){
      //console.log(err);
      res.render('index.ejs', { user: {}, page: '' });
    }
    
  });

  router.get('/pengesahan-negeri', (req, res) => {
    try{
      //var sessionId = mysession(req.cookies['connect.sid']);
      var session = req.cookies['localId'];
      res.render('index.ejs', { user: {}, page: 'pengesahan_negeri.ejs' });
  
      console.log('---------------->> ',session);
    }catch(err){
      //console.log(err);
      res.render('index.ejs', { user: {}, page: '' });
    }
    
  });

  router.get('/pengesahan-kebangsaan', (req, res) => {
    try{
      //var sessionId = mysession(req.cookies['connect.sid']);
      var session = req.cookies['localId'];
      res.render('index.ejs', { user: {}, page: 'pengesahan_kebangsaan.ejs' });
  
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

router.post('/api/repo/tugasan', (req, res)=>{
    API.repo.tugasan(req.body.negeri, req.body.pertandingan, data=>{
        res.send(data);
    })
});

router.post('/api/util/program', (req, res)=>{
    API.util.program(req.body.peringkat, data=>{
        res.send(data);
    })
});

router.post('/api/stats/penyertaan', (req, res)=>{
    API.stats.penyertaan(req.body.pertandingan, req.body.peringkat, data=>{
        res.send(data);
    })
});

module.exports = router;