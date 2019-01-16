const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.params', req.params);
    let queryText = (`DELETE FROM "style_beer" WHERE "beer_id" = $1;`);
    pool.query(queryText, [req.params.id]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.get('/', (req, res) => {
    let queryText = (`SELECT * FROM "style"
        ORDER BY "tag" ASC;`);
    pool.query(queryText).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;
