const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Logged in user can post to calendar
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('req.body', req.body);
    const queryText = `INSERT INTO "follow" ("user_id", "brewery_id") 
        VALUES ($1, $2)`
    pool.query(queryText, [req.body.user_id, req.body.brewery_id])
        .then(result => {
            res.sendStatus(201);
        }).catch(err => {
            console.log('error in calendar POST:', err);
            res.sendStatus(500);
        })
});

router.get('/myfollows', rejectUnauthenticated, (req, res) => {
    let queryText = (`SELECT * FROM "brewery" 
JOIN "follow" ON "brewery"."id" = "follow"."brewery_id" 
WHERE "user_id" = 3;`);
    pool.query(queryText, [req.query.id]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;