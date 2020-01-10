const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//Search by Brewery AND Release AND Tag NEW
router.get('/BRT/:brewery/:release1/:release2/:tag', rejectUnauthenticated, (req, res) => {
    let queryText = (`SELECT
  "b1"."name" AS "beer_name",
  "b1"."id",
  "b1"."style",
  to_char ("b1"."release", 'Mon dd, YYYY') as "release",
  "b1"."description",
  "br1"."logo_url",
  "br1"."id" as "brewery_id",
  array_agg(DISTINCT "style"."tag") AS "tag_list"
FROM
  "beer" "b1"
  JOIN "style"
  JOIN "style_beer" AS "s1" ON "style"."id" = "s1"."style_id"
  JOIN "style_beer" AS "sb1" ON "s1"."beer_id" = "sb1"."beer_id" ON "b1"."id" = "s1"."beer_id"
  JOIN "brewery" br1 ON "br1"."id" = "b1"."brewery_id"
WHERE
  "release" BETWEEN SYMMETRIC $2
  AND $3
  AND "sb1"."style_id" = $4
  AND "br1"."id" = $1
GROUP BY
  "b1"."name",
  "b1"."id",
  "br1"."logo_url",
  "br1"."id"
ORDER BY random();`);
    pool.query(queryText, [req.params.brewery, req.params.release1, req.params.release2, req.params.tag]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

//Search by Brewery AND Release
router.get('/BR/:brewery/:release1/:release2', rejectUnauthenticated, (req, res) => {
    let queryText = (`SELECT "beer"."name" AS "beer_name", "beer"."id", "beer"."style", to_char("beer"."release", 'Mon dd, YYYY') as "release", "beer"."description", "brewery"."name", "brewery"."logo_url", "brewery"."id" as "brewery_id", array_agg(
        DISTINCT "style"."tag") AS "tag_list" FROM "beer" 
        JOIN "brewery" ON "brewery"."id" = "beer"."brewery_id"
        JOIN "style_beer" ON "beer"."id" = "style_beer"."beer_id"
        JOIN "style" ON "style"."id" = "style_beer"."style_id"
        WHERE "brewery"."id" = $1 AND "release" BETWEEN SYMMETRIC $2 AND $3
        GROUP BY "beer_name", "beer"."id", "beer"."style", "release", "beer"."description", "brewery"."name", "brewery"."logo_url", "brewery"."id" ORDER BY random();`);
    pool.query(queryText, [req.params.brewery, req.params.release1, req.params.release2]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

//Search by Brewery AND Tag NEW
router.get('/BT/:brewery/:tag', rejectUnauthenticated, (req, res) => {
    let queryText = (`SELECT
  "b1"."name" AS "beer_name",
  "b1"."id",
  "b1"."style",
  to_char ("b1"."release", 'Mon dd, YYYY') as "release",
  "b1"."description",
  "br1"."logo_url",
  "br1"."id" as "brewery_id",
  array_agg(DISTINCT "style"."tag") AS "tag_list"
FROM
  "beer" "b1"
  JOIN "style"
  JOIN "style_beer" AS "s1" ON "style"."id" = "s1"."style_id"
  JOIN "style_beer" AS "sb1" ON "s1"."beer_id" = "sb1"."beer_id" ON "b1"."id" = "s1"."beer_id"
  JOIN "brewery" br1 ON "br1"."id" = "b1"."brewery_id"
WHERE
  "br1"."id" = $1
  AND "sb1"."style_id" = $2
GROUP BY
  "b1"."name",
  "b1"."id",
  "br1"."logo_url",
  "br1"."id"
ORDER BY random();`);
    pool.query(queryText, [req.params.brewery, req.params.tag]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

//Search by Release AND Tag NEW
router.get('/RT/:release1/:release2/:tag', rejectUnauthenticated, (req, res) => {
    let queryText = (`SELECT
  "b1"."name" AS "beer_name",
  "b1"."id",
  "b1"."style",
  to_char ("b1"."release", 'Mon dd, YYYY') as "release",
  "b1"."description",
  "br1"."logo_url",
  "br1"."id" as "brewery_id",
  array_agg(DISTINCT "style"."tag") AS "tag_list"
FROM
  "beer" "b1"
  JOIN "style"
  JOIN "style_beer" AS "s1" ON "style"."id" = "s1"."style_id"
  JOIN "style_beer" AS "sb1" ON "s1"."beer_id" = "sb1"."beer_id" ON "b1"."id" = "s1"."beer_id"
  JOIN "brewery" br1 ON "br1"."id" = "b1"."brewery_id"
WHERE
  "release" BETWEEN SYMMETRIC $1
  AND $2
  AND "sb1"."style_id" = $3
GROUP BY
  "b1"."name",
  "b1"."id",
  "br1"."logo_url",
  "br1"."id"
ORDER BY random();`);
    pool.query(queryText, [req.params.release1, req.params.release2, req.params.tag]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

//Search by Brewery
router.get('/B', rejectUnauthenticated, (req, res) => {
    let queryText = (`SELECT "beer"."name" AS "beer_name", "beer"."id", "beer"."style", to_char("beer"."release", 'Mon dd, YYYY') as "release", "beer"."description", "brewery"."name", "brewery"."logo_url", "brewery"."id" as "brewery_id", array_agg(
        DISTINCT "style"."tag") AS "tag_list" FROM "beer" 
        JOIN "brewery" ON "brewery"."id" = "beer"."brewery_id"
        JOIN "style_beer" ON "beer"."id" = "style_beer"."beer_id"
        JOIN "style" ON "style"."id" = "style_beer"."style_id"
        WHERE "brewery"."id" = $1 
        GROUP BY "beer_name", "beer"."id", "beer"."style", "release", "beer"."description", "brewery"."name", "brewery"."logo_url", "brewery"."id" ORDER BY random();`);
    pool.query(queryText, [req.query.brewery]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

//Search by Release
router.get('/R/:release1/:release2', rejectUnauthenticated, (req, res) => {
    let queryText = (`SELECT "beer"."name" AS "beer_name", "beer"."id", "beer"."style", to_char("beer"."release", 'Mon dd, YYYY') as "release", "beer"."description", "brewery"."name", "brewery"."logo_url", "brewery"."id" as "brewery_id", array_agg(
        DISTINCT "style"."tag") AS "tag_list" FROM "beer" 
        JOIN "brewery" ON "brewery"."id" = "beer"."brewery_id"
        JOIN "style_beer" ON "beer"."id" = "style_beer"."beer_id"
        JOIN "style" ON "style"."id" = "style_beer"."style_id"
        WHERE "release" BETWEEN SYMMETRIC $1 AND $2
        GROUP BY "beer_name", "beer"."id", "beer"."style", "release", "beer"."description", "brewery"."name", "brewery"."logo_url", "brewery"."id" ORDER BY random();`);
    pool.query(queryText, [req.params.release1, req.params.release2]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

//Search by Tag NEW
router.get('/T', rejectUnauthenticated, (req, res) => {
    let queryText = (`SELECT "beer"."name" AS "beer_name", "beer"."id", "beer"."style",         to_char ("beer"."release", 'Mon dd, YYYY') as "release", "beer"."description",  
        "brewery"."logo_url", 
        "brewery"."id" as "brewery_id", 
        array_agg( DISTINCT "style"."tag") AS "tag_list" FROM "beer" 
        JOIN "style"
        JOIN "style_beer" AS "s1" ON "style"."id" = "s1"."style_id"          
        JOIN "style_beer" AS "b1" ON "s1"."beer_id" = "b1"."beer_id"  
        ON "beer"."id" = "s1"."beer_id" 
		JOIN "brewery" ON "brewery"."id" = "beer"."brewery_id"
        WHERE "b1"."style_id" = $1
        GROUP BY "beer"."name", "beer"."id",
        "brewery"."logo_url", "brewery"."id"
        ORDER BY random();`);
    pool.query(queryText, [req.query.tag]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;
