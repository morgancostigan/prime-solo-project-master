const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    let queryText = (`SELECT "beer"."name" AS "beer_name", "beer"."id", "beer"."style", to_char("beer"."release", 'Mon dd, YYYY') as "release", "beer"."description", "brewery"."name", "brewery"."logo_url", array_agg(
        DISTINCT "style"."tag") AS "tag_list" FROM "beer" 
        JOIN "brewery" ON "brewery"."id" = "beer"."brewery_id"
        JOIN "style_beer" ON "beer"."id" = "style_beer"."beer_id"
        JOIN "style" ON "style"."id" = "style_beer"."style_id"
        GROUP BY "beer_name", "beer"."id", "beer"."style", "release", "beer"."description", "brewery"."name", "brewery"."logo_url" ORDER BY random();`);
    pool.query(queryText).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;
