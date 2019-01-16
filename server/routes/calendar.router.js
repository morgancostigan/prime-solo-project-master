const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.params', req.params);
    let queryText = (`DELETE FROM "calendar" WHERE "beer_id" = $1;`);
    pool.query(queryText, [req.params.id]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

/**
 * Logged in user can post to calendar
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('post req.body', req.body);
    const queryText = `INSERT INTO "calendar" ("user_id", "beer_id") 
        VALUES ($1, $2);`;
    pool.query(queryText, [req.body.user_id, req.body.beer_id])
        .then(result => {
            res.sendStatus(201);
        }).catch(err => {
            console.log('error in calendar POST:', err);
            res.sendStatus(500);
        })
});

router.get('/mycalendar', rejectUnauthenticated, (req, res) => {
    console.log('in mycalender req.query.id', req.query);
    
    let queryText = (`SELECT "beer"."name" AS "beer_name", "beer"."id", "beer"."style", 
        to_char ("beer"."release", 'Mon dd, YYYY') as "release", "beer"."description", 
        "brewery"."id" as "brewery_id", "brewery"."logo_url", array_agg( DISTINCT "style"."tag") 
        AS "tag_list" FROM "beer" 
        JOIN "brewery" ON "brewery"."id" = "beer"."brewery_id" 
        JOIN "style_beer" ON "beer"."id" = "style_beer"."beer_id" 
        JOIN "style" ON "style"."id" = "style_beer"."style_id" 
        JOIN "calendar" ON "calendar"."beer_id" = "beer"."id" 
        WHERE "user_id" = $1 GROUP BY "beer"."name", "beer"."id", 
        "brewery"."logo_url", "brewery"."id";`);
    pool.query(queryText, [req.query.id]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;