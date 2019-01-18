const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//Search by Brewery AND Release AND Tag
router.get('/BRT/:brewery/:release1/:release2/:tag', rejectUnauthenticated, (req, res) => {
    let queryText = (`SELECT "beer"."name" AS "beer_name", "beer"."id", "beer"."style", to_char("beer"."release", 'Mon dd, YYYY') as "release", "beer"."description", "brewery"."name", "brewery"."logo_url", "brewery"."id" as "brewery_id", array_agg(
        DISTINCT "style"."tag") AS "tag_list" FROM "beer" 
        JOIN "brewery" ON "brewery"."id" = "beer"."brewery_id"
        JOIN "style_beer" ON "beer"."id" = "style_beer"."beer_id"
        JOIN "style" ON "style"."id" = "style_beer"."style_id"
        WHERE "brewery"."id" = $1 AND "release" BETWEEN SYMMETRIC $2 AND $3 
        AND "style_beer"."style_id" = $4 
        GROUP BY "beer_name", "beer"."id", "beer"."style", "release", "beer"."description", "brewery"."name", "brewery"."logo_url", "brewery"."id" ORDER BY random();`);
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

//Search by Brewery AND Tag
router.get('/BT/:brewery/:tag', rejectUnauthenticated, (req, res) => {
    let queryText = (`SELECT "beer"."name" AS "beer_name", "beer"."id", "beer"."style", to_char("beer"."release", 'Mon dd, YYYY') as "release", "beer"."description", "brewery"."name", "brewery"."logo_url", "brewery"."id" as "brewery_id", array_agg(
        DISTINCT "style"."tag") AS "tag_list" FROM "beer" 
        JOIN "brewery" ON "brewery"."id" = "beer"."brewery_id"
        JOIN "style_beer" ON "beer"."id" = "style_beer"."beer_id"
        JOIN "style" ON "style"."id" = "style_beer"."style_id"
        WHERE "brewery"."id" = $1 AND "style_beer"."style_id" = $2 
        GROUP BY "beer_name", "beer"."id", "beer"."style", "release", "beer"."description", "brewery"."name", "brewery"."logo_url", "brewery"."id" ORDER BY random();`);
    pool.query(queryText, [req.params.brewery, req.params.tag]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

//Search by Release AND Tag
router.get('/RT/:release1/:release2/:tag', rejectUnauthenticated, (req, res) => {
    let queryText = (`SELECT "beer"."name" AS "beer_name", "beer"."id", "beer"."style", to_char("beer"."release", 'Mon dd, YYYY') as "release", "beer"."description", "brewery"."name", "brewery"."logo_url", "brewery"."id" as "brewery_id", array_agg(
        DISTINCT "style"."tag") AS "tag_list" FROM "beer" 
        JOIN "brewery" ON "brewery"."id" = "beer"."brewery_id"
        JOIN "style_beer" ON "beer"."id" = "style_beer"."beer_id"
        JOIN "style" ON "style"."id" = "style_beer"."style_id"
        WHERE "release" BETWEEN SYMMETRIC $1 AND $2 AND "style_beer"."style_id" = $3 
        GROUP BY "beer_name", "beer"."id", "beer"."style", "release", "beer"."description", "brewery"."name", "brewery"."logo_url", "brewery"."id" ORDER BY random();`);
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

//Search by Tag
router.get('/T', rejectUnauthenticated, (req, res) => {
    let queryText = (`SELECT "beer"."name" AS "beer_name", "beer"."id", "beer"."style", to_char("beer"."release", 'Mon dd, YYYY') as "release", "beer"."description", "brewery"."name", "brewery"."logo_url", "brewery"."id" as "brewery_id", array_agg(
        DISTINCT "style"."tag") AS "tag_list" FROM "beer" 
        JOIN "brewery" ON "brewery"."id" = "beer"."brewery_id"
        JOIN "style_beer" ON "beer"."id" = "style_beer"."beer_id"
        JOIN "style" ON "style"."id" = "style_beer"."style_id"
        WHERE "style_beer"."style_id" = $1 
        GROUP BY "beer_name", "beer"."id", "beer"."style", "release", "beer"."description", "brewery"."name", "brewery"."logo_url", "brewery"."id" ORDER BY random();`);
    pool.query(queryText, [req.query.tag]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;
