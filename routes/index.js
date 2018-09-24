var express = require('express');
var router = express.Router();
var connection = require('../db/index');
/* GET home page. */
connection.connect();

router.get('/', function(req, res) {
  connection.query('SELECT * FROM blog', (err, rows) => {
    if(err) throw err;
    res.render('index', { rows: rows });
  });
});

router.get('/insert', (req, res) => {
  res.render('insert');
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  connection.query(`SELECT * FROM blog WHERE id = ?`, [id], (err, rows) => {
    if(err) throw err;
    res.render('blog', { rows: rows[0] });
  });
});

router.post('/insert', (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  connection.query(`INSERT INTO blog (title, description, created) VALUES ('${title}', '${description}', NOW())`
  , (err, result) => {
    if(err) throw err;

    res.send(`
    <a href="/">돌아가기</a>
    <h2>추가가 성공적으로 되었습니다.</h2>
    `);
  });
});

router.get('/update/:id', (req, res) => {
  let id = req.params.id;
  connection.query(`SELECT * FROM blog WHERE id = ?`, [id], (err, rows) => {
    if(err) throw err;
    res.render('update', { rows: rows[0] });
  });
});

router.post('/update/:id', (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let id = req.params.id;
  connection.query('UPDATE blog SET title=?, description=?, created=NOW() WHERE id=?', [title, description, id], (err, result) => {
    if(err) throw err;
    res.send(`
    <a href="/">돌아가기</a>
    <h2>수정이 성공적으로 이루어졌습니다.</h2>
    `);
  });
});

router.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  connection.query(`DELETE FROM blog WHERE id='${id}'`, (err, result) => {
    if(err) throw err;
    res.send(`
    <a href="/">돌아가기</a>
    <h2>삭제 되었습니다.</h2>
    `);
  });
});

module.exports = router;
